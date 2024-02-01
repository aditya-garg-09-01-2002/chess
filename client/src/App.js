import './App.css';
import Board from './components/board/board.js';
import Panel from "./components/panel/panel.js"
import { useState } from 'react';
function App() {
  const [kingSideCastling,setKingSideCastling]=useState(false)
  const [queenSideCastling,setQueenSideCastling]=useState(false)
  const [isCheck,setCheck]=useState(false)
  const [isCheckMate,setCheckMate]=useState(false)
  const [isChance,setChance]=useState(false)
  const [doKingSideCastling,setDoKingSideCastling]=useState(false)
  const [doQueenSideCastling,setDoQueenSideCastling]=useState(false)
  const [winner,setWinner]=useState(false)
  return (
    <div style={{height:"100dvh",width:"100dvw",display:"flex",justifyContent:"space-around"}}>
      <Board 
        setWinner={value=>setWinner(value)}
        setChance={value=>setChance(value)} 
        setKingSideCastling={value=>setKingSideCastling(value)} 
        setQueenSideCastling={value=>setQueenSideCastling(value)} 
        setCheck={value=>setCheck(value)} 
        setCheckMate={value=>setCheckMate(value)}
        doKingSideCastling={doKingSideCastling}
        doQueenSideCastling={doQueenSideCastling}
        setDoKingSideCastling={setDoKingSideCastling}
        setDoQueenSideCastling={setDoQueenSideCastling}
      />
      <Panel isWinner={winner} isChance={isChance} kingSideCastling={kingSideCastling} queenSideCastling={queenSideCastling} isCheck={isCheck} isCheckMate={isCheckMate} setDoKingSideCastling={setDoKingSideCastling} setDoQueenSideCastling={setDoQueenSideCastling}/>
    </div >
  );
}

export default App;
