import React from "react"
import {Pawn,Rook,King,Knight,Queen,Bishop} from "./pieces"
import {useSelector} from "react-redux"

const Tile= React.forwardRef(({isOccupied,isEven,piece,color,select,index,moveTo,isMobilePortrait},ref)=>{
    const pieces={
        pawn: Pawn,
        rook: Rook,
        knight: Knight,
        bishop: Bishop,
        queen: Queen,
        king: King,
    };
    const Piece=pieces[piece];
    const chance=useSelector((state)=>state.chance)
    return (
        <>
            <div ref={ref} 
                className={
                    "tile" +`${isMobilePortrait?"-mobile":""}`
                }
                style={{backgroundColor:isEven?"#3C2A21":"#E5E5CB"}} 
                onClick={()=>{
                    (async()=>{
                        if(chance)
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
                    {isOccupied && <Piece color={color} isMobilePortrait={isMobilePortrait}/>}       
            </div>
        </>
    )
})
export {Tile}