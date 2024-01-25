function getPossibleMovesPawn(index,board)
{
    let row=Math.floor(index/8);
    let col=index%8;
    const moves=[];
    if(board[index].moved===false&&board[(row-2)*8+col].isOccupied===false)
        moves.push((row-2)*8+col);
    let check=false;
    if(row>0&&col+1<8&&board[(row-1)*8+(col+1)].isOccupied&&board[(row-1)*8+(col+1)].color==="black"&&board[(row-1)*8+(col+1)].piece!="king")
    {
        check=true;
        moves.push((row-1)*8+col+1);
    }
    if(row>0&&col-1>-1&&board[(row-1)*8+(col-1)].isOccupied&&board[(row-1)*8+(col-1)].color==="black"&&board[(row-1)*8+(col-1)].piece!="king")
    {
        check=true;
        moves.push((row-1)*8+col-1);
    }
    if(row>0&&board[(row-1)*8+col].isOccupied===false&&check===false)
        moves.push((row-1)*8+col);
    return moves;
}