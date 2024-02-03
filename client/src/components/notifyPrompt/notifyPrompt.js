import React from "react"
import styled from "styled-components"

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

export default function NotifyPrompt({type})
{
    return (
        <>
            <div style={{
                height:"100%" , 
                width:"100%" , 
                position:"fixed" ,
                display:"flex",
                flexWrap:"wrap",
                alignContent:"center",
                justifyContent:"center",
                backgroundColor: "rgba(0,0,0,0.4)",
                fontSize:"20px",
                color:"yellow",
                boxSizing:"border-box",
                textAlign:"center"
            }}>
                {
                    type === "waiting-for-opponent" ? (
                        <div>
                            <p style={{ 
                                width: "100%", padding:"0 30px", boxSizing:"border-box"
                            }}>
                            {"Wait for Other Player to Join "}
                            </p>
                            <p style={{ 
                                width: "100%", padding:"0 30px", boxSizing:"border-box"
                            }}>
                            {"To Test Kindly Join with"} 
                            <StyledChessLink href='' target="_blank" >
                                Chess
                            </StyledChessLink> 
                            {"on another tab at the same time"}
                            </p>
                        </div>
                        ) : (
                        <div>
                            <p style={{ 
                                width: "100%", padding:"0 30px", boxSizing:"border-box"
                            }}>
                            {"Your opponent has left"}
                            </p>
                            <p style={{ 
                                width: "100%", padding:"0 30px", boxSizing:"border-box"
                            }}>
                            {"You Won by Default!!!"}
                            </p>
                            <p style={{ 
                                width: "100%", padding:"0 30px", boxSizing:"border-box"
                            }}>
                            {"Kindly"}
                            {
                                <StyledChessLink onClick={(e)=>{
                                    e.preventDefault();
                                    window.location.reload();
                                }}>
                                    Reload
                                </StyledChessLink>
                            }
                            {"to start a new match"}
                            </p>
                        </div>
                        )
                    }

            </div>
        </>
    )
}