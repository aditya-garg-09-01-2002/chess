import React from "react"
import {Pawn,Rook,King,Knight,Queen,Bishop} from "./pieces"

const Tile= React.forwardRef(({isOccupied,isEven,piece,color},ref)=>{
        const pieces={
            pawn: Pawn,
            rook: Rook,
            knight: Knight,
            bishop: Bishop,
            queen: Queen,
            king: King,
        };
        const Piece=pieces[piece];
    return (
        <>
            <div ref={ref} 
                className="tile" 
                style={{backgroundColor:isEven?"green":"brown"}} >
                    {isOccupied && <Piece color={color}/>}       
            </div>
        </>
    )
})
export {Tile}