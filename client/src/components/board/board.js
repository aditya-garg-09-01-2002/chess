import React,{useEffect, useState,useRef} from "react"
import "./board.css"
import {Tile} from "./tile"
import { initialSetting,tileSetting } from "../../utils/setting";
import {select,deselect} from "../../utils/click"
import { moveFromTo, moveOpponent, promotePawnTo } from "../../utils/moves";
import PawnPromotionPrompt from "./prompt";
import io from "socket.io-client"

export default function Board(){
    const [askPawnPromotionPrompt, setPrompt] = useState(false);
    const [pawnPromotionIndex,setIndex]=useState(null);
    const [state,setState]=useState();
    const tilesRef=Array.from({length:64},()=>React.createRef())
    const [tiles,setTiles]=useState();
    const socketRef=useRef(null)
    let otherSelected=[]
    
    async function isMyChance(){
        socketRef.current.emit('mychance')
        const response= new Promise(resolve=>{
            socketRef.current.on('your-chance-true',()=>{
                resolve(true)
            })
            socketRef.current.on('your-chance-false',()=>{
                resolve(false)
            })
        })
        return response
    }

    
    function moveTo(index){
        if(otherSelected.length===0)
            return false
        const origin = otherSelected[0]
        let moved=moveFromTo({from:origin,to:index,target:state[index],deselect:deselectInd,setBoard:setState})
        if(moved===false)
            return false;
        socketRef.current.emit('have-moved',{from:origin,to:index,piece:state[index].piece})
        if(Math.floor(index/8)===0&&state[index].piece==="pawn")
        {
            setIndex(index);
            setPrompt(true)
        }
        //rest processing will happening from prompt itself
        return true;
    }

    function emitPromotionMessage(index,piece){
        socketRef.current.emit('promote-pawn',{index:index,piece:piece})
    }

    function selectInd(index){
        deselectInd()
        const highlighted=select(index,tilesRef,state)
        otherSelected=highlighted
    }

    function deselectInd()
    {
        //does not need re-render 
        setState(deselect(tilesRef,otherSelected,state))
        otherSelected=[]
    }

    useEffect(()=>{
        setState(initialSetting())
        socketRef.current=io('http://localhost:9000/')
        socketRef.current.on('opponent-move',({from,to,piece})=>{
            moveOpponent({from,to,piece,setBoard:setState})
        })
        socketRef.current.on('pawn-promotion',({index,piece})=>{
            console.log(piece,index)
            promotePawnTo(piece,index,setState)
        })
        return (()=>{
            socketRef.current.disconnect();
        })
    },[])
    useEffect(()=>{
        if(state)
            setTiles(tileSetting(state,Tile,tilesRef,selectInd,moveTo,isMyChance))
    },[state])
    return (
        <>
            <div id="board">
                {tiles}
                <PawnPromotionPrompt isOpen={askPawnPromotionPrompt} setPrompt={setPrompt} index={pawnPromotionIndex} setBoard={setState}  emitPromotionMessage={emitPromotionMessage}/>
            </div>
        </>
    )
}
