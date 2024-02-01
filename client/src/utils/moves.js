
function moveFromTo({from,to,target,deselect,setBoard})
{
    if(target.canMoveTo)
    {
        setBoard((oldBoard)=>{
            const board=[...oldBoard]
            let piece=board[from].piece;
            board[to].piece=piece
            board[to].isOccupied=true
            board[to].color="white"
            board[to].moved=true;
            board[from].color=null
            board[from].isOccupied=false;
            board[from].piece=null
            deselect()
            return board
        })
        return true;
    }
    return false;
}

function castleOpponent({side,setBoard})
{
    const rookInitial=((side==="king")?7:0);
    const rookDest=((side==="king")?5:3);
    const kingDest=((side==="king")?6:2);
    setBoard((oldBoard)=>{
        const board=[...oldBoard]
        board[rookDest].piece="rook"
        board[rookDest].isOccupied=true
        board[rookDest].color="black"
        board[rookDest].moved=true;
        board[rookInitial].color=null
        board[rookInitial].isOccupied=false;
        board[rookInitial].piece=null
        board[kingDest].piece="king"
        board[kingDest].isOccupied=true
        board[kingDest].color="black"
        board[kingDest].moved=true;
        board[4].color=null
        board[4].isOccupied=false;
        board[4].piece=null
        return board
    })
}

function castleMe({side,setBoard})
{
    const rookInitial=((side==="king")?63:56);
    const rookDest=((side==="king")?61:59);
    const kingDest=((side==="king")?62:58);
    setBoard((oldBoard)=>{
        const board=[...oldBoard];
        board[rookDest].piece="rook"
        board[rookDest].isOccupied=true
        board[rookDest].color="white"
        board[rookDest].moved=true;
        board[kingDest].piece="king"
        board[kingDest].isOccupied=true
        board[kingDest].color="white"
        board[kingDest].moved=true;
        board[rookInitial].color=null
        board[rookInitial].isOccupied=false;
        board[rookInitial].piece=null
        board[60].color=null
        board[60].isOccupied=false;
        board[60].piece=null
        console.log(60,board[60])
        return board;
    })
}

function moveOpponent({from,to,piece,setBoard})
{
    setBoard((oldBoard)=>{
        const board=[...oldBoard]
        board[to].piece=piece
        board[to].isOccupied=true
        board[to].color="black"
        board[to].moved=true;
        board[from].color=null
        board[from].isOccupied=false;
        board[from].piece=null
        return board
    })
}


function promotePawnTo(piece,index,setBoard){
    setBoard(oldBoard=>{
        const newBoard=[...oldBoard];
        newBoard[index].piece=piece;
        return newBoard;
    })
}

function getPossibleMovesPawn(index,board)
{
    let row=Math.floor(index/8);
    let col=index%8;
    const moves=[];
    if(board[index].moved===false&&board[(row-2)*8+col].isOccupied===false&&board[(row-1)*8+col].isOccupied===false)
        moves.push((row-2)*8+col);
    if(row>0&&col+1<8&&board[(row-1)*8+(col+1)].isOccupied&&board[(row-1)*8+(col+1)].color==="black"&&board[(row-1)*8+(col+1)].piece!="king")
    {
        moves.push((row-1)*8+col+1);
    }
    if(row>0&&col-1>-1&&board[(row-1)*8+(col-1)].isOccupied&&board[(row-1)*8+(col-1)].color==="black"&&board[(row-1)*8+(col-1)].piece!="king")
    {
        moves.push((row-1)*8+col-1);
    }
    if(row>0&&board[(row-1)*8+col].isOccupied===false)
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

function getPossibleMovesKnight(index,board){
    let row=Math.floor(index/8)
    let col=index%8;
    const moves=[];
    for(let i=1;i<=2;i++)
        for(let j=1;j<=2;j++)
        {
            if(i+j===3)
            {
                if(row+i<8)
                {
                    if(col+j<8)
                        if(board[(row+i)*8+col+j].color!="white")
                        moves.push((row+i)*8+col+j);
                    if(col-j>-1)
                        if(board[(row+i)*8+col-j].color!="white")
                        moves.push((row+i)*8+col-j);
                }
                if(row-i>-1)
                {
                    if(col+j<8)
                        if(board[(row-i)*8+col+j].color!="white")
                        moves.push((row-i)*8+col+j);
                    if(col-j>-1)
                        if(board[(row-i)*8+col-j].color!="white")
                        moves.push((row-i)*8+col-j)
                }
            }
        }
    return moves;
}

function getPossibleMovesBishop(index,board)
{
    let row=Math.floor(index/8)
    let col=index%8;
    const moves=[];
    for(let k=0;k<4;k++)
        for(let i=1,j=1;i<8;i++,j++)
        {
            if(k===1)
                i*=-1;
            else if(k===2)
                j*=-1;
            else if(k===3)
            {
                i*=-1;
                j*=-1;
            }
            if(row+i>-1&&row+i<8&&col+j<8&&col+j>-1)
            {
                const cell=board[(row+i)*8+(col+j)];
                if(cell.isOccupied)
                {
                    if(cell.color==="black")
                        moves.push((row+i)*8+j+col)
                    break;
                }
                moves.push((row+i)*8+col+j);
            }
            else break;
            if(k===1)
                i*=-1;
            else if(k===2)
                j*=-1;
            else if(k===3)
            {
                i*=-1;
                j*=-1;
            }
        }
    return moves;
}

function getPossibleMovesQueen(index,board)
{
    return getPossibleMovesBishop(index,board).concat(getPossibleMovesRook(index,board));
}

function getPossibleMovesKing(index,board)
{
    let row=Math.floor(index/8)
    let col=Math.floor(index%8)
    const moves=[];

    if(row>0)
    {
        if(board[(row-1)*8+col].isOccupied===false||board[(row-1)*8+col].color==="black")
            moves.push((row-1)*8+col);
        if(col>0)
            if(board[(row-1)*8+col-1].isOccupied===false||board[(row-1)*8+col-1].color==="black")
                moves.push((row-1)*8+col-1);
        if(col<7)
            if(board[(row-1)*8+col+1].isOccupied===false||board[(row-1)*8+col+1].color==="black")
                moves.push((row-1)*8+col+1);
    }
    if(row<7)
    {
        if(board[(row+1)*8+col].isOccupied===false||board[(row+1)*8+col].color==="black")
            moves.push((row+1)*8+col);
        if(col>0)
            if(board[(row+1)*8+col-1].isOccupied===false||board[(row+1)*8+col-1].color==="black")
                moves.push((row+1)*8+col-1);
        if(col<7)
            if(board[(row+1)*8+col+1].isOccupied===false||board[(row+1)*8+col+1].color==="black")
                moves.push((row+1)*8+col+1);
    }
    if(col>0)
        if(board[row*8+col-1].isOccupied===false||board[row*8+col-1].color==="black")
            moves.push(row*8+col-1);
    if(col<7)
        if(board[row*8+col+1].isOccupied===false||board[row*8+col+1].color==="black")
            moves.push(row*8+col+1);

    return moves;

}

function getPossibleMoves(piece,index,board)
{
    if(piece==="pawn")
        return getPossibleMovesPawn(index,board)
    
    else if(piece==="knight")
        return getPossibleMovesKnight(index,board)
    
    else if(piece==="rook")
        return getPossibleMovesRook(index,board)
    
    else if(piece==="bishop")
        return getPossibleMovesBishop(index,board)

    else if(piece==="queen")
        return getPossibleMovesQueen(index,board);

    else if(piece==="king")
        return getPossibleMovesKing(index,board);
        
}

export {getPossibleMoves,moveFromTo,promotePawnTo,moveOpponent,castleMe,castleOpponent}