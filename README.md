# FREQUENCY CONCEPT LAB · Music Memory V3

基于 Clockenflap 2025 公开资料的**非官方概念原型**。FREQUENCY 是独立虚构品牌；Clockenflap 及其真实嘉宾不是 FREQUENCY FESTIVAL 2026 的合作方或演出阵容。候选歌曲是艺人代表曲目，**不表示当年现场演奏过**。

## 在线体验与源代码

- 在线原型（GitHub Pages）：https://liyitian001.github.io/music-persona-ai-poster/
- 完整源代码：https://github.com/liyitian001/music-persona-ai-poster

Vercel 账号恢复仍在处理中，GitHub Pages 是当前可访问的交付地址。

## 本地运行

需要 Node.js 20.19+ 或 22.12+。在本目录运行：

```bash
npm install
npm run dev
npm run build
```

`npm run build` 包含 TypeScript 类型检查和 Vite 正式构建。无需 API Key、`.env`、后端、数据库或登录。

## 体验

欢迎页只展示抽象信号；选择人格、六位真实参考嘉宾、每人两首核对过的代表歌曲，系统自动选中歌曲的人工策划推荐风格，用户可改选。昵称、原话及同行人均可跳过。完整海报首次在结果页出现；页面解释人格、歌曲和风格如何影响视觉。结果可切换基础／更躁／更梦幻，可导出分享 PNG、高清 PNG，复制链接或扫码恢复。`PLAY TONIGHT’S ANTHEM` 是用户主动点击的官方流媒体外链，不自动播放。

界面和交付截图不显示日文字符；Vaundy 的两首歌以拉丁字母转写显示，曲目链接仍指向原作品。

12 套原创歌曲场景在 `public/posters/songs/`，由 `scripts/generate-posters.mjs` 生成，合计远低于 5 MB。源配置在 `src/catalog.ts`，人格与哈希在 `src/model.ts`，海报共用组件在 `src/Poster.tsx`，流程与计时在 `src/App.tsx`。原三张 JPG 只作风格卡局部材质预览。

## 验收视图

运行后打开 `/?qa=overview` 看固定昵称、人格、强度下的 12 套母版；`/?qa=personas` 比较同一首歌的三人格；`/?qa=styles` 比较三风格。对应截图为 `demo-v3-overview.png`、`demo-v3-personas.png`、`demo-v3-styles.png`。这些是仅供审查的直达视图，主流程没有额外操作。

## 现场与边界

开始后 45 秒总操作时限；15 秒无操作提示，之后 10 秒自动重置；结果首次显示 20 秒后清场。有效操作只更新无操作时钟，不延长总时限。重置清除所有个人输入、选择、编号、变体、提示及计时状态。图片失败有渐变兜底，生成动画可跳过，导出失败提示重试或复制链接。

分享链接把配置编码在 URL hash 中，包含用户自填文字；不要输入敏感信息。静态 PNG 不含音乐；在 Instagram、TikTok 或小红书发布时，应由发布者在平台适用的正版曲库自行搜索歌曲，找不到或权限不适用则只发布静态作品。当前在线地址可供其他设备扫码访问。详见 `PRODUCT_PLAN.md`、`AI_TOOL_USAGE.md`、`VISUAL_ASSET_LEDGER.md`、`ACCEPTANCE_TESTS.md`。

**当前交付仅采用 V3**：`demo-v3-*.png`、本 README、`PRODUCT_PLAN.md`、`AI_TOOL_USAGE.md`、`VISUAL_ASSET_LEDGER.md`、`ACCEPTANCE_TESTS.md` 和源代码。旧版截图已移出当前交付目录。代码已公开至 GitHub，并通过 GitHub Pages 发布；未创建 PR。
