# JiaobanshanPark.com

角板山公園與角板山行館園區的單頁繁體中文旅遊網站。

## 技術

- Astro（靜態輸出）
- Tailwind CSS
- TypeScript
- pnpm
- Cloudflare Workers Static Assets
- 無資料庫、無登入、無 CMS
- PWA：支援 `manifest` 與離線快取的 Service Worker（`public/sw.js`）；圖示由 `scripts/generate_icons.py` 產生至 `public/icons/`
- 天氣模組：`src/components/WeatherWidget.astro` 在構建時取得初始資料，並於瀏覽器端向 `src/worker.ts` 的 `/api/weather` 重新整理；Worker 端向天氣服務取得資料並以 Cache API 快取約 30 分鐘（伺服器端取得與快取，前端只顯示天氣）
- 天氣建議邏輯：`src/lib/weather-advice.ts` 依天氣代碼、最高／最低溫、降雨機率、累積雨量、風速與陣風、紫外線，動態產生「風險提醒／出行穿搭／遊玩安排／隨身物品」，條件不成立就不顯示；文案以角板山的山地與溪谷情境為主
- GA4：`G-HXM22WWPKP`
- 圖片產權：所有展示圖片之產權及版權均歸原攝影者所有，依原始來源標示授權

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

實景照片已下載到 `public/images/`，並產生 480 / 768 / 960 / 1440 / 1920 像素的 AVIF 與 WebP 版本。原始作者及 Creative Commons 授權列在 `PHOTO-CREDITS.md` 與網站頁尾折疊區。

照片命名規範：`<景點>-<場景>-<序號>.jpg`（例如 `jiaobanshan-park-resort-1.jpg`），衍生檔由腳本依同一字幹產生；更換圖片請沿用此命名並重新產生衍生檔。

重新處理圖片（含重新壓縮與 OG 圖）：

```bash
pnpm images
```

重新產生 PWA 圖示：

```bash
python scripts/generate_icons.py
```

## 評價與來源說明

Google 地圖評分（4.3 / 13,171 則，同步於 2026 年 9 月）僅展示於頁面，不寫入 JSON-LD；評價同步自 Google 地圖使用者評價，版權歸原作者與 Google 地圖所有。所有 Google 外部連結均保留至 Google 地圖。

## 忽略檔案

- `.gitignore`：排除 `node_modules`、`dist`、`.astro`、`wrangler` 等不需要提交的檔案
- `.cfignore`：手動部署到 Cloudflare Workers 時排除的檔案

## 更新資料

景點的開放資訊、停車與交通措施可能臨時調整。更新 `src/pages/index.astro` 與 `src/data/site.ts` 後，同步檢查 `public/sitemap.xml` 的 `lastmod`。
