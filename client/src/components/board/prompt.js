import React from 'react';
import './prompt.css';
import { promotePawnTo } from '../../utils/moves';
import {Queen,Knight,Bishop,Rook} from "./pieces"
export default function PawnPromotionPrompt({ isOpen, setPrompt,index,setBoard,emitPromotionMessage }){
  function pawnPromotion(piece){
    promotePawnTo(piece,index,setBoard);
    emitPromotionMessage(index,piece)
    setPrompt(false)
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="prompt-overlay">
      <div className="prompt-content" >
        <div style={{height:"50%",width:"50%"}} onClick={()=>pawnPromotion("queen")} ><Queen color="white"/></div>
        <div style={{height:"50%",width:"50%"}} onClick={()=>pawnPromotion("bishop")} ><Bishop color="white"/></div>
        <div style={{height:"50%",width:"50%"}} onClick={()=>pawnPromotion("knight")} ><Knight color="white"/></div>
        <div style={{height:"50%",width:"50%"}} onClick={()=>pawnPromotion("rook")} ><Rook color="white"/></div>
      </div>
    </div>
  );
};