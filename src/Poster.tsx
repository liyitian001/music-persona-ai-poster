import { useMemo, useState, type RefObject } from 'react'
import { assetFor, getArtist, getSong, STUDY } from './catalog'
import { personas, signalValues, type PosterData } from './model'

export function Signal({ data, className = '' }: { data: Pick<PosterData, 'p' | 's' | 'a' | 'g' | 'n' | 'q' | 'c' | 'v'>; className?: string }) {
  const values = useMemo(() => signalValues(data), [data.p, data.s, data.a, data.g, data.n, data.q, data.c])
  const song = getSong(data.g)
  return <svg className={`signal ${className}`} viewBox="0 0 320 90" preserveAspectRatio="none" role="img" aria-label="Personal editorial signal waveform">
    {values.map((value, i) => {
      const intensity = data.v === 'loud' ? 1.35 : data.v === 'dreamy' ? .68 : 1
      const h = Math.max(5, Math.min(82, value * .78 * intensity))
      const stroke = song?.wave === 'haze' ? 5 : song?.wave === 'steps' ? 4 : data.p === 'dreamer' ? 2 : 3.4
      return <line key={i} x1={i * 8 + 3} x2={i * 8 + 3} y1={45 - h / 2} y2={45 + h / 2} stroke="currentColor" strokeWidth={stroke} strokeLinecap={song?.wave === 'cuts' ? 'square' : 'round'} opacity={data.p === 'wildcard' && i % 4 === 0 ? .38 : .9} />
    })}
  </svg>
}

export function Poster({ data, format = 'share', posterRef, onImageError }: { data: PosterData; format?: 'share' | 'save'; posterRef?: RefObject<HTMLDivElement | null>; onImageError?: () => void }) {
  const persona = personas.find(x => x.id === data.p)!
  const song = getSong(data.g)!
  const artist = getArtist(data.a)!
  const [imageFailed, setImageFailed] = useState(false)
  return <div className={`poster persona-${data.p} style-${data.s} variant-${data.v} format-${format} scene-${data.g} ${data.n.length > 18 ? 'long-name' : ''} ${data.q.length > 55 ? 'long-quote' : ''}`} ref={posterRef} style={{ '--poster-accent': song.primary, '--poster-secondary': song.secondary } as React.CSSProperties} aria-label={`${persona.title}, ${song.title} by ${artist.name}, for ${data.n}`}>
    {!imageFailed && <img className="poster-art" src={assetFor(song.id)} alt="" onError={() => { setImageFailed(true); onImageError?.() }} />}
    <div className="poster-material" /><div className="poster-shade" />
    <div className="poster-head"><span className="poster-festival"><i>✳</i> {STUDY.brand}</span><span className="poster-date">{STUDY.event}</span></div>
    <div className="poster-identity"><span className="poster-symbol">{persona.icon}</span><span className="poster-overline">I’M THE</span><h2>{persona.title.replace('THE ', '')}</h2><span className="poster-byline">{song.scene} / {artist.genre}</span><p>{persona.line}</p></div>
    <div className="poster-song"><span>TONIGHT’S ANTHEM / MY PICK</span><strong>{song.title}</strong><em>{artist.name}</em></div>
    <div className="poster-personal"><Signal data={data} /><div className="poster-name">{data.n}</div><div className="poster-quote">“{data.q}”</div>{data.c && <div className="poster-companion">WITH {data.c}</div>}</div>
    <div className="poster-event"><div className="poster-event-foot"><span>{STUDY.place} · {STUDY.date}</span><span>NO. {data.id}</span></div></div>
    <div className="poster-share-only"><span>{STUDY.disclaimer}</span><strong>#FindYourFrequency</strong></div>
  </div>
}
