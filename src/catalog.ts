import type { StyleId } from './model'

export const STUDY = {
  brand: 'FREQUENCY CONCEPT LAB', event: 'CLOCKENFLAP 2025',
  place: 'HONG KONG CENTRAL HARBOURFRONT', date: 'DEC 5–7, 2025',
  disclaimer: 'UNOFFICIAL CONCEPT STUDY · NO FESTIVAL OR ARTIST AFFILIATION',
} as const

export const artists = [
  { id:'rich-brian', name:'Rich Brian', origin:'INDONESIA', genre:'HIP-HOP', icon:'◢', world:'Digital city / sharp cuts' },
  { id:'bloc-party', name:'Bloc Party', origin:'UNITED KINGDOM', genre:'INDIE ROCK', icon:'╱', world:'Post-punk grid / broken lines' },
  { id:'digitalism', name:'Digitalism', origin:'GERMANY', genre:'ELECTRONIC', icon:'▣', world:'Electronic pulse / light tracks' },
  { id:'passenger', name:'Passenger', origin:'UNITED KINGDOM', genre:'SINGER-SONGWRITER', icon:'◒', world:'Harbour dusk / warm light' },
  { id:'mbv', name:'my bloody valentine', origin:'IRELAND / UK', genre:'SHOEGAZE', icon:'◌', world:'Haze / drifting layers' },
  { id:'vaundy', name:'Vaundy', origin:'JAPAN', genre:'ASIAN POP', icon:'✳', world:'City flow / bright graphics' },
] as const

export type Song = { id:string; artistId:string; title:string; latin?:string; energy:number; mood:string; moodZh:string; recommendedStyle:StyleId; primary:string; secondary:string; symbol:string; wave:'cuts'|'bars'|'steps'|'swell'|'haze'|'arcs'; composition:string; material:string; shareLine:string; url:string; scene:string }

// All visual/audio attributes below are human editorial choices, not audio analysis.
export const songs: Song[] = [
  {id:'100-degrees',artistId:'rich-brian',title:'100 Degrees',energy:5,mood:'HEAT / MOMENTUM',moodZh:'热度 / 推进',recommendedStyle:'neon',primary:'#ff6c44',secondary:'#20d4e6',symbol:'◢',wave:'cuts',composition:'low diagonal ascent',material:'digital grit',shareLine:'I brought the heat',url:'https://music.apple.com/us/song/1724865912',scene:'CUT CITY'},
  {id:'kids',artistId:'rich-brian',title:'Kids',energy:3,mood:'MEMORY / CONTRAST',moodZh:'记忆 / 反差',recommendedStyle:'sunset',primary:'#f0c66f',secondary:'#465cdb',symbol:'▧',wave:'bars',composition:'off-centre stacked windows',material:'soft pixel dust',shareLine:'I kept the memory',url:'https://music.apple.com/us/song/1724859162',scene:'MEMORY BLOCKS'},
  {id:'helicopter',artistId:'bloc-party',title:'Helicopter',energy:5,mood:'URGENCY / EDGE',moodZh:'急迫 / 棱角',recommendedStyle:'neon',primary:'#f9f8ed',secondary:'#fd4052',symbol:'╱',wave:'cuts',composition:'crossing diagonals',material:'photocopy grain',shareLine:'I chased the rush',url:'https://open.spotify.com/track/4kxYIvDIpWTrZgHn3sYxxC',scene:'SPLIT IMPACT'},
  {id:'banquet',artistId:'bloc-party',title:'Banquet',energy:4,mood:'TENSION / RELEASE',moodZh:'张力 / 释放',recommendedStyle:'sunset',primary:'#fff7ed',secondary:'#ff7e26',symbol:'▥',wave:'bars',composition:'central fractured grid',material:'rough print',shareLine:'I found the spark',url:'https://open.spotify.com/embed/album/7Bev4LDhFbHGjlzveD8PQh',scene:'BROKEN GRID'},
  {id:'pogo',artistId:'digitalism',title:'Pogo',energy:5,mood:'BOUNCE / PLAY',moodZh:'跳跃 / 玩乐',recommendedStyle:'neon',primary:'#d6fc43',secondary:'#fa65cb',symbol:'▣',wave:'steps',composition:'receding tunnel',material:'clean vector glow',shareLine:'I followed the pulse',url:'https://music.apple.com/us/song/1732994767',scene:'PULSE TUNNEL'},
  {id:'zdarlight',artistId:'digitalism',title:'Zdarlight',energy:4,mood:'ASCENT / LIGHT',moodZh:'上升 / 光感',recommendedStyle:'forest',primary:'#60eaff',secondary:'#a389ff',symbol:'◇',wave:'steps',composition:'vertical radiating beams',material:'prismatic glass',shareLine:'I followed the light',url:'https://music.apple.com/us/song/1732993965',scene:'LIGHT ARRAY'},
  {id:'let-her-go',artistId:'passenger',title:'Let Her Go',energy:2,mood:'RELEASE / DUSK',moodZh:'释怀 / 黄昏',recommendedStyle:'sunset',primary:'#ffd598',secondary:'#c88785',symbol:'◒',wave:'swell',composition:'low harbour horizon',material:'paper and warm dust',shareLine:'I held the moment',url:'https://music.apple.com/us/song/1623014090',scene:'LAST LIGHT'},
  {id:'holes',artistId:'passenger',title:'Holes',energy:3,mood:'HOPE / OPEN SPACE',moodZh:'希望 / 开阔',recommendedStyle:'sunset',primary:'#f7bb79',secondary:'#6fc0b8',symbol:'○',wave:'swell',composition:'open circular aperture',material:'hand-drawn trace',shareLine:'I found a way through',url:'https://music.apple.com/us/song/1104443371',scene:'OPEN WATER'},
  {id:'only-shallow',artistId:'mbv',title:'Only Shallow',energy:4,mood:'DENSITY / BLUR',moodZh:'密度 / 模糊',recommendedStyle:'forest',primary:'#e3a8df',secondary:'#6e93d4',symbol:'◌',wave:'haze',composition:'horizontal veil layers',material:'diffused bloom',shareLine:'I disappeared into sound',url:'https://open.spotify.com/embed/album/3GH4IiI6jQAIvnHVdb5FB6',scene:'VEIL WALL'},
  {id:'when-you-sleep',artistId:'mbv',title:'When You Sleep',energy:2,mood:'DRIFT / DREAM',moodZh:'漂浮 / 梦境',recommendedStyle:'forest',primary:'#9cbded',secondary:'#e8b9d7',symbol:'☾',wave:'haze',composition:'floating offset halos',material:'soft focus mist',shareLine:'I drifted with the night',url:'https://open.spotify.com/embed/album/3GH4IiI6jQAIvnHVdb5FB6',scene:'SLEEP ORBIT'},
  {id:'kaiju-no-hanauta',artistId:'vaundy',title:'Kaiju no Hanauta',energy:5,mood:'OPEN / ANTHEMIC',moodZh:'开阔 / 合唱',recommendedStyle:'sunset',primary:'#ff796d',secondary:'#ffe069',symbol:'✳',wave:'arcs',composition:'bursting radial arcs',material:'flat luminous ink',shareLine:'I sang with the city',url:'https://open.spotify.com/track/7dTW21YAJxnAOiUh7Rtu9S',scene:'CITY CHORUS'},
  {id:'odoriko',artistId:'vaundy',title:'Odoriko',energy:3,mood:'FLOW / MOTION',moodZh:'流动 / 轻盈',recommendedStyle:'forest',primary:'#8ee5cc',secondary:'#ee8caf',symbol:'〰',wave:'arcs',composition:'curving ribbon path',material:'translucent silk',shareLine:'I moved with the city',url:'https://open.spotify.com/track/4xk70Qur2QeRmWIzWPC63V',scene:'RIBBON WALK'},
]

export const getSong = (id:string) => songs.find(song => song.id === id)
export const getArtist = (id:string) => artists.find(artist => artist.id === id)
export const assetFor = (id:string) => `/posters/songs/${id}.svg`
