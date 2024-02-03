import './App.css';
import Board from './components/board/board.js';
import Panel from "./components/panel/panel.js"
import NotifyPrompt from './components/notifyPrompt/notifyPrompt.js';
import { useState } from 'react';
import {useMediaQuery} from "react-responsive"
function App() {
  const isMobile=useMediaQuery({query:'(max-width:768px)'});
  const isPortrait=useMediaQuery({query:'(orientation:portrait)'});
  const [otherPlayerPresent,setOtherPlayerPresent]=useState(false);
  const [otherPlayerLeft,setOtherPlayerLeft]=useState(false);
  const isMobilePortrait=isMobile&&isPortrait
  const [kingSideCastling,setKingSideCastling]=useState(false)
  const [queenSideCastling,setQueenSideCastling]=useState(false)
  const [isCheck,setCheck]=useState(false)
  const [isCheckMate,setCheckMate]=useState(false)
  const [isChance,setChance]=useState(false)
  const [doKingSideCastling,setDoKingSideCastling]=useState(false)
  const [doQueenSideCastling,setDoQueenSideCastling]=useState(false)
  const [winner,setWinner]=useState(false)
  return (
    <div id={
      isMobilePortrait?
        "main-mobile":
        "main"
    }>               
      {
        otherPlayerPresent===false?
          <NotifyPrompt type="waiting-for-opponent"/>:""
      }              
      {
        otherPlayerLeft?
          <NotifyPrompt type="opponent-left"/>:""
      }
      <Board 
        setOtherPlayerLeft={(value)=>setOtherPlayerLeft(value)}
        setOtherPlayerPresent={(value)=>setOtherPlayerPresent(value)}
        isMobilePortrait={isMobilePortrait}
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
      {
        otherPlayerPresent&&otherPlayerLeft===false?
          <Panel isMobilePortrait={isMobilePortrait} isWinner={winner} isChance={isChance} kingSideCastling={kingSideCastling} queenSideCastling={queenSideCastling} isCheck={isCheck} isCheckMate={isCheckMate} setDoKingSideCastling={setDoKingSideCastling} setDoQueenSideCastling={setDoQueenSideCastling}/>
          :""
      }
    </div >
  );
}

export default App;
