import { getArtist, songs } from './catalog'
import { Poster } from './Poster'
import { posterId, styles, type PersonaId, type PosterData, type StyleId } from './model'

const fixed = (g:string,p:PersonaId='pulse',s:StyleId='neon'):PosterData => {
  const song=songs.find(x=>x.id===g)!
  const values={a:song.artistId,g,p,s,n:'ALEX',q:'This is my night.',c:''}
  return {...values,v:'base',id:posterId(values)}
}

export default function Gallery(){
  const mode=new URLSearchParams(location.search).get('qa')
  const cases=mode==='personas'?(['pulse','dreamer','wildcard'] as PersonaId[]).map(p=>({label:p, data:fixed('pogo',p)})):
    mode==='styles'?(['neon','sunset','forest'] as StyleId[]).map(s=>({label:styles.find(x=>x.id===s)!.en,data:fixed('pogo','pulse',s)})):
    songs.map(song=>({label:`${getArtist(song.artistId)?.name} / ${song.title}`,data:fixed(song.id,'pulse',song.recommendedStyle)}))
  return <main className={`qa-page ${mode==='overview'?'qa-overview':''}`}><header><strong>FREQUENCY / V3 VISUAL ACCEPTANCE</strong><span>{mode==='personas'?'ONE SONG · THREE PERSONAS':mode==='styles'?'ONE SONG · THREE STYLES':'12 SONG-LEVEL MASTER SCENES'}</span></header><section className="qa-grid">{cases.map(item=><article key={item.label}><div className="qa-poster"><Poster data={item.data}/></div><strong>{item.label}</strong></article>)}</section><footer>Fixed nickname ALEX · fixed copy · original intensity · editorial scene design · unofficial concept study</footer></main>
}
