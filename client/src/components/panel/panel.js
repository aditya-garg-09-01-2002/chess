import React from "react";
import "./panel.css"
import styled from "styled-components"
import {useSelector} from "react-redux"
const StyledChessLink = styled.a`
    color: yellow;
    text-decoration: underline;
    padding: 0px 5px;
    border-radius:10%;

    &:hover {
        color: green;
        background-color:rgba(255,255,255,0.5);
    }
`;
export default function Panel({isMobilePortrait,isWinner,kingSideCastling,queenSideCastling,isCheck,isCheckMate,setDoKingSideCastling,setDoQueenSideCastling}){
    const chance=useSelector((state)=>state.chance)
    return (
        <>
            <div id={
                isMobilePortrait?
                    "bottom-pane":
                    "right-pane"
            }>
                <div id="chance-box">
                    <p>
                        {chance?"It is your chance":"Waiting for opponent to move"}
                    </p>
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
                        backgroundColor:"rgba(0,0,0,0.8)",
                        textAlign:"center",
                        alignItems:"center",
                        justifyContent:"center",
                        alignContent:"center",
                        flexWrap:"wrap",
                        fontSize:"20px",
                        color:"yellow",
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
                            if(chance)   
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
                            if(chance)   
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