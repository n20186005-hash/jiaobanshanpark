import {
  buildAdvice,
  humidityText,
  uvText,
  windText,
  beaufortLevel,
  type WeatherAdvice,
} from './weather-advice';

export type WeatherIcon = 'sun' | 'cloud-sun' | 'cloud' | 'cloud-rain' | 'cloud-snow';

export interface WeatherDay {
  date: string;
  label: string;
  icon: WeatherIcon;
  condition: string;
  tmax: number;
  tmin: number;
  rainProb: number;
  rainHint: string;
  precipSum: number;
  windMax: number;
  windLevel: number;
  windLabel: string;
  uv: number;
  uvLabel: string;
  humidity: number;
  humidityLabel: string;
  summary: string;
  advice: WeatherAdvice;
}

export interface WeatherNow {
  temp: number;
  feels: number;
  humidity: number;
  humidityLabel: string;
  wind: number;
  windLevel: number;
  windLabel: string;
  uv: number;
  uvLabel: string;
  icon: WeatherIcon;
  condition: string;
  rainProb: number;
  rainHint: string;
  summary: string;
}

export interface WeatherPayload {
  updated: string;
  location: string;
  now: WeatherNow;
  days: WeatherDay[];
}

const WMO: Record<number, { condition: string; icon: WeatherIcon }> = {
  0: { condition: '晴', icon: 'sun' },
  1: { condition: '多雲時晴', icon: 'cloud-sun' },
  2: { condition: '多雲', icon: 'cloud' },
  3: { condition: '陰', icon: 'cloud' },
  45: { condition: '有霧', icon: 'cloud' },
  48: { condition: '霧凇', icon: 'cloud' },
  51: { condition: '零星毛毛雨', icon: 'cloud-rain' },
  53: { condition: '毛毛雨', icon: 'cloud-rain' },
  55: { condition: '毛毛雨', icon: 'cloud-rain' },
  56: { condition: '凍毛毛雨', icon: 'cloud-rain' },
  57: { condition: '凍毛毛雨', icon: 'cloud-rain' },
  61: { condition: '小雨', icon: 'cloud-rain' },
  63: { condition: '雨', icon: 'cloud-rain' },
  65: { condition: '大雨', icon: 'cloud-rain' },
  66: { condition: '凍雨', icon: 'cloud-rain' },
  67: { condition: '凍雨', icon: 'cloud-rain' },
  71: { condition: '小雪', icon: 'cloud-snow' },
  73: { condition: '雪', icon: 'cloud-snow' },
  75: { condition: '大雪', icon: 'cloud-snow' },
  77: { condition: '雪粒', icon: 'cloud-snow' },
  80: { condition: '陣雨', icon: 'cloud-rain' },
  81: { condition: '陣雨', icon: 'cloud-rain' },
  82: { condition: '強陣雨', icon: 'cloud-rain' },
  85: { condition: '陣雪', icon: 'cloud-snow' },
  86: { condition: '強陣雪', icon: 'cloud-snow' },
  95: { condition: '雷陣雨', icon: 'cloud-rain' },
  96: { condition: '雷陣雨伴冰雹', icon: 'cloud-rain' },
  99: { condition: '雷陣雨伴冰雹', icon: 'cloud-rain' },
};

function decode(code: number): { condition: string; icon: WeatherIcon } {
  return WMO[code] ?? { condition: '多雲', icon: 'cloud' };
}

function round(value: number): number {
  return Math.round(value);
}

function oneDecimal(value: number): number {
  return Math.round(value * 10) / 10;
}

function dayLabel(iso: string, index: number): string {
  if (index === 0) return '今天';
  if (index === 1) return '明天';
  const date = new Date(`${iso}T00:00:00+08:00`);
  const week = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];
  return week[date.getDay()];
}

/** 降雨機率不是肯定會下雨，用詞保留彈性 */
export function rainHintFor(probability: number, condition: string): string {
  if (condition.includes('雨') || condition.includes('雪')) return '有降雨，出門帶傘更安心';
  if (probability >= 60) return '降雨機率偏高，建議帶傘';
  if (probability >= 30) return '留意午後降雨，可帶輕便雨具';
  return '降雨機率不高，暫時不必帶傘';
}

export function buildPayload(raw: unknown, location: string): WeatherPayload {
  const data = raw as {
    current: Record<string, number>;
    daily: {
      time: string[];
      weather_code: number[];
      temperature_2m_max: number[];
      temperature_2m_min: number[];
      precipitation_probability_max?: number[];
      precipitation_sum?: number[];
      wind_speed_10m_max?: number[];
      wind_gusts_10m_max?: number[];
      uv_index_max?: number[];
      relative_humidity_2m_mean?: number[];
    };
  };
  const current = data.current ?? {};
  const daily = data.daily;

  const nowMeta = decode(current.weather_code ?? 2);
  const nowProb = round(daily.precipitation_probability_max?.[0] ?? 0);
  const nowWind = current.wind_speed_10m ?? 0;
  const nowWindLevel = beaufortLevel(nowWind);
  const nowUv = current.uv_index ?? 0;

  const days: WeatherDay[] = daily.time.map((iso, index) => {
    const meta = decode(daily.weather_code[index]);
    const probability = round(daily.precipitation_probability_max?.[index] ?? 0);
    const precipSum = oneDecimal(daily.precipitation_sum?.[index] ?? 0);
    const windMax = oneDecimal(daily.wind_speed_10m_max?.[index] ?? 0);
    const gust = oneDecimal(daily.wind_gusts_10m_max?.[index] ?? 0);
    const windLevel = beaufortLevel(windMax);
    const uv = Math.round(daily.uv_index_max?.[index] ?? 0);
    const humidity = round(daily.relative_humidity_2m_mean?.[index] ?? 0);
    const tmax = round(daily.temperature_2m_max[index]);
    const tmin = round(daily.temperature_2m_min[index]);

    return {
      date: iso,
      label: dayLabel(iso, index),
      icon: meta.icon,
      condition: meta.condition,
      tmax,
      tmin,
      rainProb: probability,
      rainHint: rainHintFor(probability, meta.condition),
      precipSum,
      windMax,
      windLevel,
      windLabel: windText(windLevel),
      uv,
      uvLabel: uvText(uv),
      humidity,
      humidityLabel: humidityText(humidity),
      summary: `${meta.condition} ${tmin}–${tmax}℃ ${uvText(uv)} ${windText(windLevel)}`,
      advice: buildAdvice({
        code: daily.weather_code[index],
        condition: meta.condition,
        tmax,
        tmin,
        rainProb: probability,
        precipSum,
        windMax,
        windGust: gust,
        uv,
      }),
    };
  });

  return {
    updated: new Date().toISOString(),
    location,
    now: {
      temp: round(current.temperature_2m ?? 0),
      feels: round(current.apparent_temperature ?? current.temperature_2m ?? 0),
      humidity: round(current.relative_humidity_2m ?? 0),
      humidityLabel: humidityText(round(current.relative_humidity_2m ?? 0)),
      wind: oneDecimal(nowWind),
      windLevel: nowWindLevel,
      windLabel: windText(nowWindLevel),
      uv: Math.round(nowUv),
      uvLabel: uvText(Math.round(nowUv)),
      icon: nowMeta.icon,
      condition: nowMeta.condition,
      rainProb: nowProb,
      rainHint: rainHintFor(nowProb, nowMeta.condition),
      summary: `${nowMeta.condition} ${round(current.temperature_2m ?? 0)}℃ ${uvText(Math.round(nowUv))} ${windText(nowWindLevel)}`,
    },
    days,
  };
}

export function weatherApiUrl(latitude: number, longitude: number): string {
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m,wind_gusts_10m,uv_index',
    daily:
      'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,precipitation_sum,wind_speed_10m_max,wind_gusts_10m_max,uv_index_max,relative_humidity_2m_mean',
    timezone: 'Asia/Taipei',
    forecast_days: '7',
    wind_speed_unit: 'ms',
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
}

export async function fetchWeather(
  latitude: number,
  longitude: number,
  location: string,
): Promise<WeatherPayload | null> {
  try {
    const response = await fetch(weatherApiUrl(latitude, longitude), {
      headers: { 'User-Agent': 'JiaobanshanPark-Weather/1.0 (+https://JiaobanshanPark.com)' },
    });
    if (!response.ok) return null;
    return buildPayload(await response.json(), location);
  } catch {
    return null;
  }
}
