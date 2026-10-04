# FREQUENCY — Music Persona Poster

一个为音乐节互动大屏设计的、英文优先的受控 AIGC 原型。用户选音乐人格与视觉风格，可选填昵称/短句，约 30–45 秒获得可下载、可分享的专属海报。

## 本地运行

需要 Node.js 20.19+ 或 22.12+。

```bash
npm install
npm run dev
```

打开终端显示的本地地址。生产构建：`npm run build`；本地预览：`npm run preview`。项目无 `.env`、无需 API Key、无后端。

## 交付物

| 文件 | 内容 |
|---|---|
| `src/` | React + TypeScript 交互与普通 CSS |
| `public/posters/` | 三张预生成的无文字 AI 背景 |
| `PRODUCT_PLAN.md` | 一页产品方案 |
| `AI_TOOL_USAGE.md` | 一页 AI 工具使用说明 |
| `DEMO_SCRIPT.md` | 45 秒录屏脚本 |
| `demo-welcome.png`、`demo-result.png`、`demo-mobile.png` | 桌面及手机页面演示截图 |
| `demo-poster.png` | 浏览器实测导出的 PNG |

## 技术与生成机制

React + Vite + TypeScript + CSS 变量；`html-to-image` 导出 720×1080 PNG；`qrcode.react` 生成分享二维码。海报背景是 AI **预生成** 的本地 JPG，页面把背景、人物文案、昵称、短句、品牌与编号实时组合。生成动画约 3.2 秒，不代表实时模型推理。无运行时生图 API 调用。

分享链接把作品配置编码在 URL hash 中，接收端直接重建作品，不经服务器存储。昵称和短句会包含在链接里，请勿输入敏感信息。二维码使用当前页面地址：部署到 Vercel 后可跨设备使用；本地 `127.0.0.1` 地址只能在本机打开。

## 失败与安全边界

- 所有文字选填，避免输入成为完成障碍；限制昵称 24 字、短句 80 字。
- 拦截明显网址、联系方式和 HTML 标记；这是演示级过滤，**不能替代正式内容审核**。
- PNG 导出异常时提示重试或浏览器截图。分享依赖浏览器的系统分享或剪贴板能力。
- 无账号、数据库、后台、手机号收集或付费生图主流程。没有行为埋点；指标见产品方案，需在正式测试环境实施。

## 部署（待用户批准）

代码可按 Vite 静态站点部署到 Vercel：Build Command `npm run build`，Output Directory `dist`。当前项目仅本地创建与提交，**未推送 GitHub、未创建 PR、未部署**。部署前应检查仓库可见性、Git 提交身份、密钥和隐私内容，并用 Vercel 实际域名复测扫码。
