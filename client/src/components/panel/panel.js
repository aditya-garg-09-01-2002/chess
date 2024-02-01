import React from "react";
import "./panel.css"
export default function Panel({isWinner,isChance,kingSideCastling,queenSideCastling,isCheck,isCheckMate,setDoKingSideCastling,setDoQueenSideCastling}){
    return (
        <>
            <div id="right-pane">
                <div id="chance-box">
                    <p>
                        {isChance?"It is your chance":"Waiting for opponent to move"}
                    </p>
                </div>
                {isCheck?
                    <p id="check-box">
                        You Are in Check!!!<br/>
                        Move Carefully
                    </p>
                :""}
                {isCheckMate?
                    <div style={{display:"flex",position:"absolute",top:"0",left:"0",width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.7)",color:"white",textAlign:"center",alignItems:"center",justifyContent:"center"}}>
                        {
                            isWinner?
                            "You have won!!!":
                            "Opponent has given a CheckMate to you!!!"
                        }
                        <br/>Please Reload to Start a New Game
                    </div>
                :""}
                {kingSideCastling?
                    <div 
                        className="castling-button"
                        onClick={()=>{
                            if(isChance)   
                            setDoKingSideCastling(true)
                        }}
                    >
                        King Side Castling
                    </div>
                :""}
                {queenSideCastling?
                    <div 
                        className="castling-button"
                        onClick={()=>{
                            if(isChance)   
                            setDoQueenSideCastling(true)
                        }}
                    >
                        Queen Side Castling
                    </div>
                :""}
            </div>
        </>
    )
}