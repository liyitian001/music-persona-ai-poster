import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Gallery from './Gallery'
import './style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>{new URLSearchParams(location.search).has('qa') ? <Gallery /> : <App />}</React.StrictMode>,
)
