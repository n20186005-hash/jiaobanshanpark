# JiaobanshanPark.com

角板山公園與角板山行館園區的單頁繁體中文旅遊網站。

## 技術

- Astro（靜態輸出）
- Tailwind CSS
- TypeScript
- pnpm
- Cloudflare Workers Static Assets
- 無資料庫、無登入、無 CMS
- GA4：`G-HXM22WWPKP`

## 本機開發

```bash
corepack enable
pnpm install
pnpm dev
```

開啟 `http://localhost:4321`。

## 檢查與建置

```bash
pnpm check
pnpm build
```

輸出位於 `dist/`。

## 部署到 Cloudflare Workers

先登入 Cloudflare：

```bash
pnpm wrangler login
```

建置並部署：

```bash
pnpm deploy
```

`wrangler.jsonc` 已設定由 Worker 綁定 `dist/` 靜態資產，並在回應中加入基本安全標頭。

部署後，在 Cloudflare Workers 專案的 **Settings → Domains & Routes** 綁定：

- `JiaobanshanPark.com`
- `www.JiaobanshanPark.com`（建議轉址到裸網域）

## 圖片

實景照片已下載到 `public/images/`，並產生 480 / 768 / 960 像素的 AVIF 與 WebP 版本。原始作者及 Creative Commons 授權列在網站頁尾折疊區。

重新處理圖片：

```bash
pnpm images
```

## 更新資料

景點的開放資訊、停車與交通措施可能臨時調整。更新 `src/pages/index.astro` 與 `src/data/site.ts` 後，同步檢查 `public/sitemap.xml` 的 `lastmod`。
