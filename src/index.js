import React from 'react'
import ReactDOM from 'react-dom/client'
import Game from './components/Game';
import './style.css'

function App() {
  return (
    <Game />
  )
}

const domContainer = document.querySelector('#root');
const root = ReactDOM.createRoot(domContainer);
root.render(<App/>);
