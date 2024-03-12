import React from "react";
import "./panel.css"
import styled from "styled-components"
import {useSelector} from "react-redux"
const StyledChessLink = styled.a`
    color: #D5CEA3;
    padding: 0px 2.5px;
    margin:0px 2.5px;
    border-radius:10%;
    
    &:hover {
        color: #E5E5CB;
        text-decoration: underline;
        background-color:#1A120B;
    }
`;
export default function Panel({isMobilePortrait,isWinner,isCheckMate,setDoKingSideCastling,setDoQueenSideCastling}){
    const isChance=useSelector((state)=>state.chance)
    const isCheck=useSelector((state)=>state.check)
    const castling=useSelector((state)=>state.castling)
    const {kingSideCastling,queenSideCastling}=castling

    return (
        <>
            <div id={
                isMobilePortrait?
                    "bottom-pane":
                    "right-pane"
            }>
                <div id="chance-box">
                    {isChance?"It is your chance":"Waiting for opponent to move"}
                </div>
                {isCheck?
                    <p id=
                    {
                        isMobilePortrait?
                            "check-box-mobile":
                            "check-box"
                    }
                    >
                        You Are in Check!!!<br/>
                        Move Carefully
                    </p>
                :""}
                {isCheckMate?
                    <div style={{
                        position:"absolute",
                        display:"flex",
                        top:"0",
                        left:"0",
                        width:"100%",
                        height:"100%",
                        backgroundColor:"#3c2a21aa",
                        textAlign:"center",
                        alignItems:"center",
                        justifyContent:"center",
                        alignContent:"center",
                        flexWrap:"wrap",
                        fontSize:"20px",
                        color:"#D5CEA3",
                        boxSizing:"border-box",
                    }}>
                        <p>
                            {
                                isWinner?
                                "You have won!!!":
                                "Opponent has given a CheckMate to you!!!"
                            }
                            <br/>Please 
                            {<StyledChessLink onClick={(e)=>{
                                e.preventDefault();
                                window.location.reload();
                            }}>
                                Reload
                            </StyledChessLink>} 
                            to Start a New Game
                        </p>
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