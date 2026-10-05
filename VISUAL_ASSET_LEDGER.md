# V3 视觉素材与曲目核验记录

**制作方式（完整配方）**：没有使用图片生成提示词。12 张本地母版由 `scripts/generate-posters.mjs` 中每首歌独立的原始 SVG 图形路径、渐变和少量模糊效果生成，输出为 `public/posters/songs/<songId>.svg`，画布统一 360×540、无可读文字。海报文字、人格排版、风格材质、强度和确定性波形由 `src/Poster.tsx`、`src/style.css` 与 `src/catalog.ts` 在前端叠加。脚本是可复现的**完整制作方式**；没有隐藏提示词。所有曲目能量、情绪及推荐风格为人工策划，不是音频分析。

| 嘉宾／曲目与歌曲来源 | 场景、选择原因 | 与同嘉宾另一首的区别（至少四维） | 人工修改与安全检查 |
|---|---|---|---|
| Rich Brian · [100 Degrees](https://music.apple.com/us/song/1724865912) | CUT CITY：高能量对应低重心上升切面 | 相比 Kids：斜向上构图、右侧焦点、切割三角、橙／青、断拍线、数字砂砾 | 手绘折线和光块；无头像、封面、Logo、歌词 |
| Rich Brian · [Kids](https://music.apple.com/us/song/1724859162) | MEMORY BLOCKS：记忆感用偏心叠窗 | 相比 100 Degrees：横向堆叠、左下焦点、窗口符号、金／蓝、短条波、柔颗粒 | 调整窗口遮挡与留字区；无受保护资产 |
| Bloc Party · [Helicopter](https://open.spotify.com/track/4kxYIvDIpWTrZgHn3sYxxC) | SPLIT IMPACT：紧迫感用交叉冲击 | 相比 Banquet：对角交叉、中央碰撞、斜杠、黑白红、断拍、复印颗粒 | 细化破线粗细；无乐队标志、封面 |
| Bloc Party · [Banquet](https://open.spotify.com/embed/album/7Bev4LDhFbHGjlzveD8PQh) | BROKEN GRID：紧张与释放用断裂网格 | 相比 Helicopter：中心矩形、网格焦点、格栅、黑白橙、条状波、粗印刷感 | 加入断裂橙线；无官方视觉 |
| Digitalism · [Pogo](https://music.apple.com/us/song/1732994767) | PULSE TUNNEL：跳跃感用递进透视方框 | 相比 Zdarlight：向内透视、中心焦点、方框、荧光绿／粉、阶梯波、硬质矢量 | 逐层校准透视；无音频或专辑视觉 |
| Digitalism · [Zdarlight](https://music.apple.com/us/song/1732993965) | LIGHT ARRAY：上升光感用放射束 | 相比 Pogo：向外／向上放射、下方汇聚、菱形、青／紫、阶梯波、棱镜柔光 | 光束与菱形分层；无现成舞台图 |
| Passenger · [Let Her Go](https://music.apple.com/us/song/1623014090) | LAST LIGHT：释怀感用低海平线与落日 | 相比 Holes：横向海平线、右上太阳、半圆、暖金／玫瑰、长波、纸张暖尘 | 波纹人工重绘；无歌手肖像／歌词 |
| Passenger · [Holes](https://music.apple.com/us/song/1104443371) | OPEN WATER：希望感用可穿越的圆形开口 | 相比 Let Her Go：环形中心、圆孔、橙／青、长波、手绘轨迹、向外扩张 | 留出圆心和标题区；无商业图像 |
| my bloody valentine · [Only Shallow](https://open.spotify.com/embed/album/3GH4IiI6jQAIvnHVdb5FB6) | VEIL WALL：密度与失焦用横向雾层 | 相比 When You Sleep：横向叠层、中部宽焦点、雾带、粉／蓝、宽波、扩散光 | 调整三层透明度；无专辑封面 |
| my bloody valentine · [When You Sleep](https://open.spotify.com/embed/album/3GH4IiI6jQAIvnHVdb5FB6) | SLEEP ORBIT：漂浮感用错位光晕 | 相比 Only Shallow：圆形偏心、环形符号、蓝／粉、漂浮宽波、柔焦薄雾、旋转趋势 | 手调双环位置；无摄影素材 |
| Vaundy · [Kaiju no Hanauta](https://vaundy.jp/discography/) | CITY CHORUS：开阔感用放射图形 | 相比 Odoriko：中心爆发、星状射线、珊瑚／黄、弧形波、平面荧光、向外扩张 | 射线与中心层级调整；无角色或 MV 画面 |
| Vaundy · [Odoriko](https://vaundy.jp/discography/) | RIBBON WALK：流动感用交错丝带 | 相比 Kaiju no Hanauta：横向 S 曲线、偏右焦点、带状符号、薄荷／粉、弧形波、半透明材质 | 调整交叉关系；无动漫／封面元素 |

**出处与表述**：六位嘉宾的 Clockenflap 2025 参与事实与曲风均据[官方阵容公告](https://www.clockenflap.com/2025-press-release-14thnov)。上表歌曲来自艺人官网、Apple Music 或 Spotify 曲目／专辑页，证明作品归属，不证明其曾在 2025 现场演出。Digitalism 官方标注为 DJ SET。Clockenflap 的[五舞台、海滨及艺术装置](https://www.clockenflap.com/2025-press-release-21nov)仅用于场景原则研究，没有复制官方视觉。

**资源检查**：12 张 SVG 共约 12.7 KB，单张远低于 350 KB，总量远低于 5 MB；不加载远端背景。输出无文字、Logo、人像、封面、角色或官方音乐节视觉。原三张 JPG 仍在风格卡用于局部材质提示，不在最终海报中复用。正式商业使用前仍需品牌与权利复核。
