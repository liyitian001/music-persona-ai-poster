export type Lang = 'en' | 'zh'
export type Step = 'welcome' | 'persona' | 'artist' | 'song' | 'style' | 'words' | 'generating' | 'result'
export type PersonaId = 'pulse' | 'dreamer' | 'wildcard'
export type StyleId = 'neon' | 'sunset' | 'forest'
export type Variant = 'base' | 'loud' | 'dreamy'
export type PosterData = { p: PersonaId; s: StyleId; a: string; g: string; n: string; q: string; c: string; id: string; v: Variant }

export const FESTIVAL = {
  name: 'FREQUENCY FESTIVAL 2026',
  theme: 'FIND YOUR FREQUENCY',
  place: 'NEON BAY',
  date: 'OCT 24–25, 2026',
  hashtag: '#FindYourFrequency',
} as const

export const personas: { id: PersonaId; icon: string; en: string; zh: string; detailEn: string; detailZh: string; title: string; line: string; stage: string }[] = [
  { id: 'pulse', icon: '✦', en: 'The Pulse', zh: '脉冲者', detailEn: 'You move the crowd.', detailZh: '你的节奏让全场共振。', title: 'THE PULSE', line: 'MAKE THE NIGHT MOVE', stage: 'PULSE STAGE' },
  { id: 'dreamer', icon: '☾', en: 'The Dreamer', zh: '造梦者', detailEn: 'You find magic between beats.', detailZh: '你在节拍间发现魔法。', title: 'THE DREAMER', line: 'FOLLOW THE FEELING', stage: 'DREAM STAGE' },
  { id: 'wildcard', icon: '✳', en: 'The Wildcard', zh: '破格者', detailEn: 'You follow no one’s rhythm.', detailZh: '只循自己的频率。', title: 'THE WILDCARD', line: 'BREAK THE PATTERN', stage: 'WILDCARD STAGE' },
]

export const styles: { id: StyleId; en: string; zh: string; mood: string; color: string; secondary: string; moment: string; texture: string }[] = [
  { id: 'neon', en: 'After Dark Grid', zh: '夜色网格', mood: 'ELECTRIC / BOLD', color: '#a9eaff', secondary: '#f363e6', moment: '22:00–23:00', texture: 'GRID + LASER' },
  { id: 'sunset', en: 'Harbour Signal', zh: '海港信号', mood: 'WARM / OPEN', color: '#ffd287', secondary: '#ff7275', moment: '18:00–19:00', texture: 'HORIZON + HEAT' },
  { id: 'forest', en: 'Tidal Haze', zh: '潮汐雾光', mood: 'SOFT / LAYERED', color: '#ccefc6', secondary: '#9a9afa', moment: '20:00–21:00', texture: 'HAZE + REFRACTION' },
]

export const defaults = { en: 'I came here to feel everything.', zh: '今晚，让心跳跟着音乐走。' }

export function safeText(value: string): boolean {
  return !/(https?:\/\/|www\.|@|\b\d[\d\s-]{7,}\d\b|[<>]|[\u0000-\u001f\u007f])/i.test(value)
}

export function signalValues(data: Pick<PosterData, 'p' | 's' | 'a' | 'g' | 'n' | 'q' | 'c'>, count = 40): number[] {
  const source = `${data.p}|${data.s}|${data.a}|${data.g}|${data.n.normalize('NFC')}|${data.q.normalize('NFC')}|${data.c.normalize('NFC')}`
  const song = getSong(data.g)
  let seed = 2166136261
  for (const char of source) { seed ^= char.codePointAt(0)!; seed = Math.imul(seed, 16777619) }
  return Array.from({ length: count }, (_, index) => {
    seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5
    const random = (seed >>> 0) / 4294967295
    const phase = index / (count - 1) * Math.PI
    const envelope = song?.wave === 'steps' ? (index % 5 < 3 ? .9 : .36) : song?.wave === 'haze' ? .52 + .25 * Math.sin(index * .35) : song?.wave === 'arcs' ? .5 + .42 * Math.abs(Math.sin(index * .22)) : song?.wave === 'swell' ? .34 + .56 * Math.sin(phase) : song?.wave === 'cuts' ? (index % 4 ? .78 : .25) : .48 + .44 * Math.abs(Math.sin(index * .65))
    return Math.round((.18 + random * .8) * envelope * (song?.energy ?? 3) / 5 * 100)
  })
}

export function posterId(data: Pick<PosterData, 'p' | 's' | 'a' | 'g' | 'n' | 'q' | 'c'>): string {
  const source = `${data.p}|${data.s}|${data.a}|${data.g}|${data.n.normalize('NFC')}|${data.q.normalize('NFC')}|${data.c.normalize('NFC')}`
  let hash = 2166136261
  for (const char of source) { hash ^= char.codePointAt(0)!; hash = Math.imul(hash, 16777619) }
  return (hash >>> 0).toString(36).toUpperCase().padStart(7, '0').slice(0, 7)
}

export function readShared(): PosterData | null {
  try {
    const params = new URLSearchParams(location.hash.slice(1))
    const compact = params.get('p')
    const legacy = params.get('poster')
    if (!compact && !legacy) return null
    if ((compact?.length ?? legacy!.length) > 3000) return null
    const json = compact
      ? new TextDecoder().decode(Uint8Array.from(atob(compact.replace(/-/g, '+').replace(/_/g, '/')), char => char.charCodeAt(0)))
      : decodeURIComponent(legacy!)
    const value = JSON.parse(json) as PosterData
    if (!personas.some(x => x.id === value.p) || !styles.some(x => x.id === value.s)) return null
    if (typeof value.a !== 'string' || typeof value.g !== 'string' || typeof value.n !== 'string' || typeof value.q !== 'string' || typeof value.c !== 'string' || getSong(value.g)?.artistId !== value.a) return null
    if (!safeText(value.n) || !safeText(value.q) || !safeText(value.c)) return null
    const v: Variant = ['base', 'loud', 'dreamy'].includes(value.v) ? value.v : 'base'
    const clean = { p: value.p, s: value.s, a: value.a, g: value.g, n: value.n.slice(0, 24), q: value.q.slice(0, 80), c: value.c.slice(0, 24) }
    return { ...clean, id: posterId(clean), v }
  } catch { return null }
}

export function posterUrl(data: PosterData): string {
  const url = new URL(location.href)
  url.search = ''
  const bytes = new TextEncoder().encode(JSON.stringify(data))
  const encoded = btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')
  url.hash = new URLSearchParams({ p: encoded }).toString()
  return url.toString()
}
import { getSong } from './catalog'
