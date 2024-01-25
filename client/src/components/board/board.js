import React,{useEffect, useState,useRef} from "react"
import "./board.css"

export default function Board(){
    return (
        <>
            <div id="board">
                {tiles}
            </div>
        </>
    )
}
