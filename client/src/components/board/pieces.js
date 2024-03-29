import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faChessPawn,faChessRook,faChessBishop,faChessKnight,faChessQueen,faChessKing} from '@fortawesome/free-regular-svg-icons'

const PieceComponent=(piece,icon,{color})=>{
    return (
        <FontAwesomeIcon className={"pieces"} icon={icon} style={{color:color==="white"?"#D5CEA3":"#1A120B",filter:`drop-shadow(0px 0px 1px ${color==="white"?"black":"white"})`}}/>
    )
}

const King= (props) => PieceComponent("King",faChessKing,props);
const Queen= (props) => PieceComponent("Queen",faChessQueen,props);
const Bishop= (props) => PieceComponent("Bishop",faChessBishop,props);
const Knight= (props) => PieceComponent("Knight",faChessKnight,props);
const Rook= (props) => PieceComponent("Rook",faChessRook,props);
const Pawn= (props) => PieceComponent("Pawn",faChessPawn,props);

export {Pawn,Rook,Knight,Bishop,King,Queen}