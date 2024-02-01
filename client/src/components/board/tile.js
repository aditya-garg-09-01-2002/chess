import React from "react"
import {Pawn,Rook,King,Knight,Queen,Bishop} from "./pieces"

const Tile= React.forwardRef(({isOccupied,isEven,piece,color,select,index,moveTo,isMyChance},ref)=>{
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
                style={{backgroundColor:isEven?"green":"brown"}} 
                onClick={()=>{
                    (async()=>{
                        if(await isMyChance())
                        {
                            if(moveTo(index)===true)
                                return;
                            select(index)
                        }
                        else{
                            console.log('not my chance')
                        }
                    })()
                }}>
                    {isOccupied && <Piece color={color}/>}       
            </div>
        </>
    )
})
export {Tile}