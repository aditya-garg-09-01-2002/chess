import './App.css';
import Board from './components/board/board.js';
import Panel from "./components/panel/panel.js"
import NotifyPrompt from './components/notifyPrompt/notifyPrompt.js';
import { useState } from 'react';
import {useMediaQuery} from "react-responsive"
import {store} from "./redux/store.js"
import {Provider} from "react-redux"

function App() {
  const isMobile=useMediaQuery({query:'(max-width:768px)'});
  const isPortrait=useMediaQuery({query:'(orientation:portrait)'});
  const [otherPlayerPresent,setOtherPlayerPresent]=useState(false);
  const [otherPlayerLeft,setOtherPlayerLeft]=useState(false); 
  const isMobilePortrait=isMobile&&isPortrait
  const [isCheckMate,setCheckMate]=useState(false)
  const [doKingSideCastling,setDoKingSideCastling]=useState(false)
  const [doQueenSideCastling,setDoQueenSideCastling]=useState(false)
  const [winner,setWinner]=useState(false)

  return (
    <Provider store={store}>
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
          setCheckMate={value=>setCheckMate(value)}
          doKingSideCastling={doKingSideCastling}
          doQueenSideCastling={doQueenSideCastling}
          setDoKingSideCastling={setDoKingSideCastling}
          setDoQueenSideCastling={setDoQueenSideCastling}
          />
        {
          otherPlayerPresent&&otherPlayerLeft===false?
          <Panel isMobilePortrait={isMobilePortrait} isWinner={winner} isCheckMate={isCheckMate} setDoKingSideCastling={setDoKingSideCastling} setDoQueenSideCastling={setDoQueenSideCastling}/>
          :""
        }
      </div >
    </Provider>
  );
}

export default App;
