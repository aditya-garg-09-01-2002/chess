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

function getPossibleMovesRook(index,board)
{
    //special excahnge move with king is left
    let row=Math.floor(index/8);
    let col=index%8;
    let moves=[]
    for(let i=row-1;i>-1;i--)
    {
        const cell=board[i*8+col];
        if(cell.isOccupied)
        {
            if(cell.color==="black")
                moves.push(i*8+col);
            break;
        }
        moves.push(i*8+col);
    }
    for(let i=row+1;i<8;i++)
    {
        const cell=board[i*8+col];
        if(cell.isOccupied)
        {
            if(cell.color==="black")
                moves.push(i*8+col);
            break;
        }
        moves.push(i*8+col);
    }
    for(let j=col+1;j<8;j++)
    {
        const cell=board[row*8+j];
        if(cell.isOccupied)
        {
            if(cell.color==="black")
                moves.push(row*8+j);
            break;
        }
        moves.push(row*8+j);
    }
    for(let j=col-1;j>-1;j--)
    {
        const cell=board[row*8+j];
        if(cell.isOccupied)
        {
            if(cell.color==="black")
                moves.push(row*8+j);
            break;
        }
        moves.push(row*8+j);
    }
    return moves
}