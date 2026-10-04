import { useEffect, useMemo, useRef, useState } from 'react'
import { toPng } from 'html-to-image'
import { QRCodeSVG } from 'qrcode.react'

type Lang = 'en' | 'zh'
type Step = 'welcome' | 'persona' | 'style' | 'words' | 'generating' | 'result'
type PersonaId = 'pulse' | 'dreamer' | 'wildcard'
type StyleId = 'neon' | 'sunset' | 'forest'
type PosterData = { p: PersonaId; s: StyleId; n: string; q: string; id: string }

const personas: { id: PersonaId; icon: string; en: string; zh: string; detailEn: string; detailZh: string; title: string; line: string }[] = [
  { id: 'pulse', icon: '✦', en: 'The Pulse', zh: '脉冲者', detailEn: 'You make the whole crowd move.', detailZh: '你的节奏让全场共振。', title: 'THE PULSE', line: 'BORN TO MOVE THE NIGHT' },
  { id: 'dreamer', icon: '☾', en: 'The Dreamer', zh: '造梦者', detailEn: 'You find magic between the beats.', detailZh: '你在节拍间发现魔法。', title: 'THE DREAMER', line: 'LOST IN THE BEST WAY' },
  { id: 'wildcard', icon: '✳', en: 'The Wildcard', zh: '破格者', detailEn: 'No rules. Just your own frequency.', detailZh: '不守规则，只循自己的频率。', title: 'THE WILDCARD', line: 'UNPREDICTABLE BY DESIGN' },
]
const styles: { id: StyleId; en: string; zh: string; mood: string; color: string }[] = [
  { id: 'neon', en: 'Electric night', zh: '电光之夜', mood: 'NEON / AFTER DARK', color: '#c98aff' },
  { id: 'sunset', en: 'Golden hour', zh: '黄金时刻', mood: 'HEAT / IN MOTION', color: '#ffb36e' },
  { id: 'forest', en: 'Afterglow', zh: '余辉秘境', mood: 'GLOW / BEYOND', color: '#d6f684' },
]
const steps: Step[] = ['persona', 'style', 'words']
const defaults = { en: 'I came here to feel everything.', zh: '今晚，让心跳跟着音乐走。' }
const copy = {
  en: {
    eyebrow: 'AN EXPERIMENT IN SELF-EXPRESSION', welcomeTitle: <>FIND YOUR<br /><em>FREQUENCY.</em></>, welcomeBody: 'Your music has a personality. Make it visible in 30 seconds.', start: 'Create my poster', time: '≈ 30 SEC · NO SIGN-UP',
    personaKicker: '01 / YOUR ENERGY', personaTitle: 'What is your festival energy?', personaHint: 'Choose the one that feels most like you.',
    styleKicker: '02 / YOUR WORLD', styleTitle: 'Set the visual mood.', styleHint: 'Same energy. A different universe.',
    wordsKicker: '03 / MAKE IT YOURS', wordsTitle: 'Add your signature.', wordsHint: 'A name and a line. Both are optional.', name: 'YOUR NAME / NICKNAME', quote: 'YOUR LINE', optional: 'OPTIONAL', next: 'Continue', generate: 'Make my poster', back: 'Back', skip: 'Surprise me',
    generating: 'Tuning into your frequency', generatingSub: 'Composing your visual identity…', resultKicker: 'YOUR FESTIVAL ALTER EGO', resultTitle: 'Made for this moment.', resultHint: 'Save it, share it, make it yours.', download: 'Download PNG', share: 'Share link', copied: 'Link copied', remix: 'Make another', scan: 'SCAN TO OPEN ON YOUR PHONE',
    exportError: 'PNG export failed. Please try again or use your browser’s screenshot.', inputError: 'Please remove links, contact details, or unsupported characters.', privacy: 'Your words stay in this browser. A shared link contains your name and line.', introTag: 'AI-CURATED · HUMAN-OWNED',
  },
  zh: {
    eyebrow: '一次关于自我表达的实验', welcomeTitle: <>找到你的<br /><em>音乐频率。</em></>, welcomeBody: '音乐有性格。30 秒，让你的音乐人格可见。', start: '制作我的海报', time: '约 30 秒 · 无需注册',
    personaKicker: '01 / 音乐人格', personaTitle: '今晚，你是哪种能量？', personaHint: '选一个最像自己的答案。',
    styleKicker: '02 / 视觉世界', styleTitle: '选择你的视觉氛围。', styleHint: '同一种能量，不同的宇宙。',
    wordsKicker: '03 / 留下印记', wordsTitle: '为作品署名。', wordsHint: '昵称和短句均可跳过。', name: '你的名字 / 昵称', quote: '你的一句话', optional: '选填', next: '继续', generate: '生成我的海报', back: '返回', skip: '帮我决定',
    generating: '正在调频', generatingSub: '正在组合你的视觉人格…', resultKicker: '你的音乐节分身', resultTitle: '这一刻，为你而生。', resultHint: '保存、分享，或再创作一张。', download: '下载 PNG', share: '分享链接', copied: '链接已复制', remix: '再做一张', scan: '扫码在手机上打开',
    exportError: 'PNG 导出失败，请重试，或使用浏览器截图。', inputError: '请移除网址、联系方式或不支持的字符。', privacy: '输入仅保存在当前浏览器。分享链接中会包含昵称和短句。', introTag: 'AI 预制视觉 · 人来表达',
  },
}

function readShared(): PosterData | null {
  try {
    const raw = new URLSearchParams(location.hash.slice(1)).get('poster')
    if (!raw || raw.length > 500) return null
    const value = JSON.parse(decodeURIComponent(raw)) as PosterData
    if (!personas.some(x => x.id === value.p) || !styles.some(x => x.id === value.s)) return null
    if (typeof value.n !== 'string' || typeof value.q !== 'string' || typeof value.id !== 'string') return null
    if (!safeText(value.n) || !safeText(value.q)) return null
    return { ...value, n: value.n.slice(0, 24), q: value.q.slice(0, 80), id: value.id.slice(0, 10) }
  } catch { return null }
}

function safeText(value: string): boolean {
  return !/(https?:\/\/|www\.|@|\b\d[\d\s-]{7,}\d\b|[<>])/i.test(value)
}

function posterUrl(data: PosterData): string {
  const url = new URL(location.href)
  url.hash = new URLSearchParams({ poster: encodeURIComponent(JSON.stringify(data)) }).toString()
  return url.toString()
}

function Poster({ data, posterRef }: { data: PosterData; posterRef?: React.RefObject<HTMLDivElement | null> }) {
  const persona = personas.find(x => x.id === data.p)!
  const style = styles.find(x => x.id === data.s)!
  return <div className={`poster poster-${style.id}`} ref={posterRef} style={{ '--poster-accent': style.color } as React.CSSProperties} aria-label={`${persona.title} poster for ${data.n}`}>
    <img className="poster-art" src={`/posters/${style.id}.jpg`} alt="" />
    <div className="poster-vignette" />
    <div className="poster-top"><span className="poster-brand"><span className="brand-mark">✳</span> FREQUENCY</span><span>FESTIVAL / 2026</span></div>
    <div className="poster-body"><span className="poster-series">PERSONA SERIES — {style.mood}</span><h2>{persona.title}</h2><p>{persona.line}</p></div>
    <div className="poster-bottom"><div className="poster-rule" /><div className="poster-quote">“{data.q}”</div><div className="poster-footer"><span>MADE FOR<br /><strong>{data.n}</strong></span><span className="poster-number">NO. {data.id}</span></div></div>
  </div>
}

export default function App() {
  const shared = useMemo(readShared, [])
  const [lang, setLang] = useState<Lang>('en')
  const [step, setStep] = useState<Step>(shared ? 'result' : 'welcome')
  const [persona, setPersona] = useState<PersonaId>(shared?.p ?? 'pulse')
  const [style, setStyle] = useState<StyleId>(shared?.s ?? 'neon')
  const [name, setName] = useState(shared?.n ?? '')
  const [quote, setQuote] = useState(shared?.q ?? '')
  const [result, setResult] = useState<PosterData | null>(shared)
  const [error, setError] = useState('')
  const [exporting, setExporting] = useState(false)
  const [copied, setCopied] = useState(false)
  const [progress, setProgress] = useState(0)
  const posterRef = useRef<HTMLDivElement>(null)
  const t = copy[lang]

  useEffect(() => {
    if (step !== 'generating') return
    const start = Date.now()
    const timer = window.setInterval(() => setProgress(Math.min(100, Math.round((Date.now() - start) / 32))), 60)
    const done = window.setTimeout(() => { setProgress(100); setStep('result') }, 3200)
    return () => { clearInterval(timer); clearTimeout(done) }
  }, [step])

  const goBack = () => {
    if (step === 'style') setStep('persona')
    if (step === 'words') setStep('style')
    setError('')
  }
  const makePoster = () => {
    if (!safeText(name) || !safeText(quote)) { setError(t.inputError); return }
    const data: PosterData = { p: persona, s: style, n: name.trim() || (lang === 'en' ? 'YOU' : '你'), q: quote.trim() || defaults[lang], id: Math.random().toString(36).slice(2, 8).toUpperCase() }
    setResult(data); setProgress(0); setError(''); setStep('generating')
    history.replaceState(null, '', location.pathname + location.search)
  }
  const download = async () => {
    if (!posterRef.current || !result) return
    setExporting(true); setError('')
    try {
      await document.fonts.ready
      const uri = await toPng(posterRef.current, { pixelRatio: 2, cacheBust: true, backgroundColor: '#0c0b14' })
      const link = document.createElement('a'); link.download = `frequency-${result.id}.png`; link.href = uri; link.click()
    } catch { setError(t.exportError) } finally { setExporting(false) }
  }
  const share = async () => {
    if (!result) return
    const url = posterUrl(result)
    try {
      if (navigator.share) await navigator.share({ title: 'My FREQUENCY poster', url })
      else await navigator.clipboard.writeText(url)
      setCopied(true); window.setTimeout(() => setCopied(false), 2500)
    } catch (cause) {
      if (cause instanceof DOMException && cause.name === 'AbortError') return
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true); window.setTimeout(() => setCopied(false), 2500)
      } catch { setError(lang === 'en' ? 'Sharing is unavailable in this browser. Please scan the QR code.' : '当前浏览器无法分享，请扫描二维码。') }
    }
  }
  const restart = () => { setStep('persona'); setResult(null); setName(''); setQuote(''); setError(''); history.replaceState(null, '', location.pathname + location.search) }
  const stepIndex = steps.indexOf(step)

  return <main className={`app ${step === 'welcome' ? 'is-welcome' : ''}`}>
    <header className="site-header"><div className="logo"><span className="logo-icon">✳</span><span>FREQUENCY<span className="logo-dot">.</span></span></div><div className="header-right"><span className="header-edition">AN INTERACTIVE FESTIVAL EXPERIENCE</span><button className="lang-switch" type="button" onClick={() => setLang(lang === 'en' ? 'zh' : 'en')} aria-label="Switch language">{lang === 'en' ? '中文' : 'EN'}</button></div></header>
    {step !== 'welcome' && step !== 'generating' && step !== 'result' && <div className="step-track" aria-label="Progress"><span>{String(stepIndex + 1).padStart(2, '0')} / 03</span><div className="track"><i style={{ width: `${((stepIndex + 1) / 3) * 100}%` }} /></div><span>CREATE YOUR POSTER</span></div>}

    {step === 'welcome' && <section className="welcome-layout"><div className="welcome-copy"><div className="eyebrow"><span className="eyebrow-line" />{t.eyebrow}</div><h1>{t.welcomeTitle}</h1><p className="lead">{t.welcomeBody}</p><button className="primary-button" onClick={() => setStep('persona')}>{t.start}<span>↗</span></button><div className="micro-copy"><span className="small-star">✳</span>{t.time}<span className="micro-divider" />{t.introTag}</div></div><div className="welcome-visual"><div className="visual-orbit orbit-one" /><div className="visual-orbit orbit-two" /><div className="hero-poster"><img src="/posters/neon.jpg" alt="Violet music festival art preview" /><div className="hero-poster-shade" /><div className="hero-poster-text"><span>FREQUENCY / 2026</span><strong>YOUR SOUND.<br />YOUR SELF.</strong><span>FIND THE FEELING →</span></div></div><div className="hero-caption">A VISUAL IDENTITY<br />FOR YOUR FESTIVAL SELF</div><div className="floating-label">ONE OF ONE <span>↗</span></div></div></section>}

    {step === 'persona' && <section className="choice-section"><div className="section-heading"><span className="section-kicker">{t.personaKicker}</span><h1>{t.personaTitle}</h1><p>{t.personaHint}</p></div><div className="persona-grid">{personas.map((item, i) => <button type="button" className={`persona-card ${persona === item.id ? 'selected' : ''}`} key={item.id} onClick={() => setPersona(item.id)}><span className="card-index">0{i + 1} / 03</span><span className="persona-icon">{item.icon}</span><span className="card-name">{item[lang]}</span><span className="card-detail">{lang === 'en' ? item.detailEn : item.detailZh}</span><span className="card-arrow">↗</span></button>)}</div><div className="choice-actions"><button className="text-button" onClick={() => setStep('welcome')}>← {t.back}</button><button className="primary-button" onClick={() => setStep('style')}>{t.next}<span>↗</span></button></div></section>}

    {step === 'style' && <section className="choice-section"><div className="section-heading"><span className="section-kicker">{t.styleKicker}</span><h1>{t.styleTitle}</h1><p>{t.styleHint}</p></div><div className="style-grid">{styles.map((item, i) => <button type="button" className={`style-card ${style === item.id ? 'selected' : ''}`} key={item.id} onClick={() => setStyle(item.id)}><img src={`/posters/${item.id}.jpg`} alt="" /><div className="style-overlay" /><span className="style-index">0{i + 1} / 03</span><span className="style-name">{item[lang]} <span>↗</span></span></button>)}</div><div className="choice-actions"><button className="text-button" onClick={goBack}>← {t.back}</button><button className="primary-button" onClick={() => setStep('words')}>{t.next}<span>↗</span></button></div></section>}

    {step === 'words' && <section className="words-layout"><div className="words-copy"><div className="section-heading"><span className="section-kicker">{t.wordsKicker}</span><h1>{t.wordsTitle}</h1><p>{t.wordsHint}</p></div><div className="field"><label htmlFor="name">{t.name} <span>{t.optional}</span></label><input id="name" autoComplete="off" maxLength={24} value={name} onChange={e => setName(e.target.value)} placeholder={lang === 'en' ? 'e.g. Alex' : '例如：小乐'} /></div><div className="field"><label htmlFor="quote">{t.quote} <span>{t.optional}</span></label><textarea id="quote" maxLength={80} rows={2} value={quote} onChange={e => setQuote(e.target.value)} placeholder={defaults[lang]} /><small>{quote.length}/80</small></div><p className="privacy-note">✳ {t.privacy}</p>{error && <p className="error" role="alert">{error}</p>}<div className="choice-actions"><button className="text-button" onClick={goBack}>← {t.back}</button><button className="primary-button" onClick={makePoster}>{t.generate}<span>↗</span></button></div></div><div className="words-preview"><div className="preview-label">LIVE PREVIEW / {styles.find(x => x.id === style)?.mood}</div><Poster data={{ p: persona, s: style, n: name.trim() || 'YOU', q: quote.trim() || defaults[lang], id: 'XXXXXX' }} /></div></section>}

    {step === 'generating' && <section className="generating-screen"><div className="generator-art"><div className="generator-ring ring-a" /><div className="generator-ring ring-b" /><div className="generator-core">✳</div></div><span className="section-kicker">FREQUENCY / IN PROCESS</span><h1>{t.generating}<span className="loading-dots">…</span></h1><p>{t.generatingSub}</p><div className="generate-bar"><i style={{ width: `${progress}%` }} /></div><span className="generate-percent">{progress}%</span></section>}

    {step === 'result' && result && <section className="result-layout"><div className="result-copy"><span className="section-kicker">{t.resultKicker}</span><h1>{t.resultTitle}</h1><p>{t.resultHint}</p><div className="result-persona"><span>✳</span><div><small>YOU ARE</small><strong>{personas.find(x => x.id === result.p)?.[lang]}</strong></div></div><div className="result-actions"><button className="primary-button" onClick={download} disabled={exporting}>{exporting ? 'EXPORTING…' : t.download}<span>↓</span></button><button className="secondary-button" onClick={share}>{copied ? t.copied : t.share}<span>↗</span></button></div><button className="text-button remix-button" onClick={restart}>↶ {t.remix}</button>{error && <p className="error" role="alert">{error}</p>}<p className="result-disclosure">{t.privacy}</p></div><div className="result-poster-wrap"><Poster data={result} posterRef={posterRef} /></div><aside className="qr-panel"><div className="qr-box"><QRCodeSVG value={posterUrl(result)} size={110} bgColor="#fff" fgColor="#11111b" marginSize={0} /></div><span>{t.scan}</span><small>FREQUENCY / SHARE YOUR SIGNAL</small></aside></section>}
    <footer className="site-footer"><span>© 2026 FREQUENCY PROJECT</span><span>MADE FOR THE MOMENT <span className="footer-star">✳</span></span></footer>
  </main>
}
