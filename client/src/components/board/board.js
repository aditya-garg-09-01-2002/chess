import React,{useEffect, useState,useRef} from "react"
import "./board.css"
import {Tile} from "./tile"
import { initialSetting,tileSetting } from "../../utils/setting";
import {select,deselect} from "../../utils/click"
import { moveFromTo, moveOpponent, promotePawnTo,castleMe,castleOpponent } from "../../utils/moves";
import PawnPromotionPrompt from "./prompt";
import io from "socket.io-client"
import { inCheck} from "../../utils/check";
import {setCastling} from "../../utils/castling";
import { updateChance } from "../../redux/slices/chance";
import {useDispatch,useSelector} from "react-redux"

export default function Board({setOtherPlayerLeft,setOtherPlayerPresent,isMobilePortrait,setWinner,setCheck,setCheckMate,setKingSideCastling,setQueenSideCastling,doKingSideCastling,doQueenSideCastling,setDoKingSideCastling,setDoQueenSideCastling}){
    const [askPawnPromotionPrompt, setPrompt] = useState(false);
    const [pawnPromotionIndex,setIndex]=useState(null);
    const intialState=initialSetting()
    const [state,setState]=useState(intialState);
    const tilesRef=Array.from({length:64},()=>React.createRef())
    const [tiles,setTiles]=useState();
    let castlingDone=false;
    const socketRef=useRef(null)
    let kingPosition=60;
    let otherSelected=[]
    
    const dispatch=useDispatch()
    const chance=useSelector((state)=>state.chance)
    
    function moveTo(index){
        if(otherSelected.length===0)
            return false
        const origin = otherSelected[0]
        let moved=moveFromTo({from:origin,to:index,target:state[index],deselect:deselectInd,setBoard:setState})
        if(moved===false)
            return false;
        if(state[index].piece==="king")
            kingPosition=index; 
        socketRef.current.emit('have-moved',{from:origin,to:index,piece:state[index].piece})
        if(Math.floor(index/8)===0&&state[index].piece==="pawn")
        {
            setIndex(index);
            setPrompt(true)
        }
        socketRef.current.on('check-status',()=>{
            if(inCheck({index:kingPosition,board:state}))
                setCheck(true)
            else 
                setCheck(false)
        })
        dispatch(updateChance())

        //rest processing will happening from prompt itself
        return true;
    }

    function emitPromotionMessage(index,piece){
        socketRef.current.emit('promote-pawn',{index:index,piece:piece})
    }

    function selectInd(index){
        deselectInd()
        const highlighted=select(index,tilesRef,state,isMobilePortrait)
        otherSelected=highlighted
    }

    function deselectInd()
    {
        //does not need re-render 
        setState(deselect(tilesRef,otherSelected,state))
        otherSelected=[]
    }

    function doCastling({side})
    {
        const kingDest=((side==="king")?62:58);
        kingPosition=kingDest;
        castleMe({side,setBoard:setState})
        castlingDone=true;
        socketRef.current.emit('have-castled',{side:side})
    }
    useEffect(()=>{
        (async()=>{
            if(doKingSideCastling===true)
            {
                if(chance)
                {
                    dispatch(updateChance())
                    doCastling({side:"king"});
                }   
                setDoKingSideCastling(false);
            }
        })()
    },[doKingSideCastling])
    
    useEffect(()=>{
        (async()=>{
            if(doQueenSideCastling===true)
            {
                if(chance)
                {
                    dispatch(updateChance())
                    doCastling({side:"queen"});
                }   
                setDoQueenSideCastling(false);
            }
        })()
    },[doQueenSideCastling])

    useEffect(()=>{
        socketRef.current=io(process.env.REACT_APP_BACKEND_URL)
        socketRef.current.on('')
        socketRef.current.on('player-one',()=>setOtherPlayerPresent(true))
        socketRef.current.on('player-two',()=>setOtherPlayerPresent(true))
        socketRef.current.on('other-player-left',()=>setOtherPlayerLeft(true))
        socketRef.current.emit('mychance')
        socketRef.current.on('you-won',()=>{
            setCheckMate(true)
            setWinner(true)
        })
        socketRef.current.on('castle-opponent',({side})=>{
            dispatch(updateChance())
            kingPosition=((side==="king")?6:2);
            castleOpponent({side,setBoard:setState})
        })
        socketRef.current.on('opponent-move',({from,to,piece})=>{
            dispatch(updateChance())
            if(castlingDone===false)
                setCastling({setKingSideCastling,setQueenSideCastling,state,from,to,piece})
            if(state[to].piece==="king"&&state[to].isOccupied===true&&state[to].color==="white")
            {
                socketRef.current.emit('check-mate')
                setCheckMate(true)
            }
            if(inCheck({index:kingPosition,board:state,piece,to,from}))
                setCheck(true)
            else
                setCheck(false)
            moveOpponent({from,to,piece,setBoard:setState})
        })
        socketRef.current.on('you-start',()=>{
            dispatch(updateChance())
        })
        socketRef.current.on('pawn-promotion',({index,piece})=>{
            promotePawnTo(piece,index,setState)
        })
        return (()=>{
            socketRef.current.disconnect();
        })
    },[])
    useEffect(()=>{
        if(state)
            setTiles(tileSetting(state,Tile,tilesRef,selectInd,moveTo,isMobilePortrait))
    },[state])
    return (
        <>
            <div id={
                isMobilePortrait?
                    "board-mobile":
                    "board"
            }>
                {tiles}
                <PawnPromotionPrompt isOpen={askPawnPromotionPrompt} setPrompt={setPrompt} index={pawnPromotionIndex} setBoard={setState}  emitPromotionMessage={emitPromotionMessage}/>
            </div>
        </>
    )
}
