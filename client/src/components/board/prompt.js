import React from 'react';
import './prompt.css';
import { promotePawnTo } from '../../utils/moves';
import {Queen,Knight,Bishop,Rook} from "./pieces"
export default function PawnPromotionPrompt({ isOpen, setPrompt,index,setBoard }){
  function pawnPromotion(piece){
    promotePawnTo(piece,index,setBoard);
    setPrompt(false)
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className="prompt-overlay">
      <div className="prompt-content" >
        <div style={{height:"50%",width:"50%"}}onClick={()=>pawnPromotion("queen")}><Queen/></div>
        <div style={{height:"50%",width:"50%"}}onClick={()=>pawnPromotion("bishop")}><Bishop/></div>
        <div style={{height:"50%",width:"50%"}}onClick={()=>pawnPromotion("knight")}><Knight/></div>
        <div style={{height:"50%",width:"50%"}}onClick={()=>pawnPromotion("rook")}><Rook/></div>
      </div>
    </div>
  );
};