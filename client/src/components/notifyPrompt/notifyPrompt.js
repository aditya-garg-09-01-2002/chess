import React from "react"
import styled from "styled-components"

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

export default function NotifyPrompt({type})
{
    return (
        <>
            <div style={{
                zIndex:1000,
                height:"100%" , 
                width:"100%" , 
                position:"fixed" ,
                display:"flex",
                flexWrap:"wrap",
                alignContent:"center",
                justifyContent:"center",
                backgroundColor: "#3c2a21aa",
                fontSize:"20px",
                color:"#D5CEA3",
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