import { buildPayload, weatherApiUrl } from './lib/weather';

interface Env {
  ASSETS: {
    fetch(request: Request): Promise<Response>;
  };
}

interface WorkerContext {
  waitUntil(promise: Promise<unknown>): void;
}

const securityHeaders: Record<string, string> = {
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
};

const DEFAULT_LATITUDE = 24.813974;
const DEFAULT_LONGITUDE = 121.3506816;
const LOCATION = '桃園市復興區';

async function handleWeather(request: Request, ctx: WorkerContext): Promise<Response> {
  const url = new URL(request.url);
  const latitude = Number(url.searchParams.get('lat')) || DEFAULT_LATITUDE;
  const longitude = Number(url.searchParams.get('lon')) || DEFAULT_LONGITUDE;
  const apiUrl = weatherApiUrl(latitude, longitude);

  const cache = (caches as unknown as { default: Cache }).default;
  let upstream = await cache.match(apiUrl);
  if (!upstream) {
    upstream = await fetch(apiUrl, {
      headers: { 'User-Agent': 'JiaobanshanPark-Weather/1.0 (+https://JiaobanshanPark.com)' },
    });
    if (!upstream.ok) {
      return new Response(JSON.stringify({ error: 'weather_unavailable' }), {
        status: 502,
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
      });
    }
    ctx.waitUntil(cache.put(apiUrl, upstream.clone()));
  }

  const payload = JSON.stringify(buildPayload(await upstream.json(), LOCATION));
  return new Response(payload, {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=1800, s-maxage=1800, stale-while-revalidate=3600',
    },
  });
}

export default {
  async fetch(request: Request, env: Env, ctx: WorkerContext): Promise<Response> {
    const url = new URL(request.url);
    const host = url.host.toLowerCase();

    // 統一規範：http → https，www → 裸網域（與 canonical 一致）
    if (url.protocol === 'http:') {
      return Response.redirect(`https://${host}${url.pathname}${url.search}`, 308);
    }
    if (host.startsWith('www.')) {
      return Response.redirect(`https://${host.slice(4)}${url.pathname}${url.search}`, 308);
    }

    if (url.pathname === '/api/weather') {
      return handleWeather(request, ctx);
    }

    const response = await env.ASSETS.fetch(request);
    const headers = new Headers(response.headers);

    for (const [key, value] of Object.entries(securityHeaders)) {
      headers.set(key, value);
    }

    if (url.pathname === '/sw.js' || url.pathname === '/site.webmanifest') {
      headers.set('Cache-Control', 'no-cache, must-revalidate');
    } else if (url.pathname.startsWith('/_astro/')) {
      headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    } else if (url.pathname.startsWith('/images/')) {
      headers.set('Cache-Control', 'public, max-age=604800, stale-while-revalidate=86400');
    }

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
