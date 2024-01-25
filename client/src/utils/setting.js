const initialSetting = ()=>{
    const board=[];
    for(let i=0;i<8;i++)
    {
        for(let j=0;j<8;j++)
        {
            let piece,color,isOccupied=false;
            if(i===0||i===1||i===6||i===7)
                isOccupied=true;
            if(i===0||i===1)
                color="black"
            if(i===6||i===7)
                color="white"
            if(i===1||i===6)
                piece="pawn"
            else if((j===0||j===7)&&(i===0||i===7))
                piece="rook"
            else if((j===1||j===6)&&(i===0||i===7))
                piece="knight"
            else if((j===2||j===5)&&(i===0||i===7))
                piece="bishop"
            else if(j===3&&(i===0||i===7))
                piece="queen"
            else if(j===4&&(i===0||i===7))
                piece="king"
            board.push({isOccupied:isOccupied,piece:piece,color:color,canMoveTo:false,moved:false});
            // tempTiles.push(<Tile key={i*8+j} tileRef={tilesRef[i*8+j]} canMoveTo={false} row={i} col={j} piece={piece} color={color} onMove={movePiece} hideAllowedMoves={hideAllowedMoves} showAllowedMoves={showAllowedMoves} highlightAllowedMoves={highlightAllowedMoves}/>)
        }        
    }
    return board
}