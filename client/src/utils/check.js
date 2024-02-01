function inCheck({index,board,to,piece,from})
{
    if(typeof(from)!=='undefined')
        board[from].isOccupied=false
    if(typeof(to)!=='undefined')
    {
        board[to].isOccupied=true;
        board[to].color="black";
        board[to].piece=piece;
    }
    if(Math.floor(index/8)!=0)
        if(inCheckByPawn({index,board}))
            return true;    
    if(inCheckByRook({index,board}))
        return true;
    if(inCheckByKnight({index,board}))
        return true;
    if(inCheckByBishop({index,board}))
        return true;
    if(inCheckByQueen({index,board}))
        return true;
    return false;
}
function inCheckByPawn({index,board})
{
    for(let i=-1;i<2;i++)
    {
        const tile=board[index-8+i];
        if(tile.isOccupied===true&&tile.color==="black"&&tile.piece==="pawn")
            return true;
    }
    return false;
}
function inCheckByKnight({index,board})
{
    const knightAt=[];
    let row=Math.floor(index/8)
    let col=index%8;
    for(let i=1;i<=2;i++)
        for(let j=1;j<=2;j++)
        {
            if(i+j===3)
            {
                if(row+i<8)
                {
                    if(col+j<8)
                        knightAt.push((row+i)*8+col+j);
                    if(col-j>-1)
                        knightAt.push((row+i)*8+col-j);
                }
                if(row-i>-1)
                {
                    if(col+j<8)
                        knightAt.push((row-i)*8+col+j);
                    if(col-j>-1)
                        knightAt.push((row-i)*8+col-j)
                }
            }
        }
    for(let i=0;i<knightAt.length;i++)
        if(board[knightAt[i]].isOccupied===true&&board[knightAt[i]].color==="black"&&board[knightAt[i]].piece==="knight")
            return true;
    return false;
}
function inCheckByRook({index,board})
{
    let rookInSight=false;
    let flag10=true,flag20=true,flag30=true,flag40=true;
    for(let i=1;i<8;i++)
    {
        let row=Math.floor(index/8);
        let col=index%8
        if(col-i>-1)
        {
            if(board[index-i].isOccupied===true)
            {
                if(board[index-i].color==="black"&&board[index-i].piece==="rook"&&flag10===true)
                    rookInSight=true;
                else 
                    flag10=false;
            }
        }
        if(col+i<8)
        {
            if(board[index+i].isOccupied===true)
            {
                if(board[index+i].color==="black"&&board[index+i].piece==="rook"&&flag20===true)
                    rookInSight=true;
                else 
                    flag20=false;
            }
        }
        if(row-i>-1)
        {
            if(board[index-8*i].isOccupied===true)
            {
                if(board[index-8*i].color==="black"&&board[index-8*i].piece==="rook"&&flag30===true)
                    rookInSight=true
                else   
                    flag30=false;
            }
        }
        if(row+i<8)
        {
            if(board[index+8*i].isOccupied===true)
            {
                if(board[index+8*i].color==="black"&&board[index+8*i].piece==="rook"&flag40===true)
                    rookInSight=true;
                else 
                    flag40=false;
            }
        }
    }
    return rookInSight;
}
function inCheckByBishop({index,board})
{
    let bishopInSight=false;
    let flag1=true,flag2=true,flag3=true,flag4=true;
    for(let i=1;i<8;i++)
    {
        let row=Math.floor(index/8),col=index%8
        if(row-i>-1&&col+i<8)
        {
            if(board[index-7*i].isOccupied===true)
            {
                if(board[index-7*i].color==="black"&&board[index-7*i].piece==="bishop"&&flag1===true)
                    bishopInSight=true;
                else
                    flag1=false;
            }
        }
        if(row-i>-1&&col-i>-1)
        {            
            if(board[index-9*i].isOccupied===true)
            {
                if(board[index-9*i].color==="black"&&board[index-9*i].piece==="bishop"&&flag2===true)
                    bishopInSight=true;
                else 
                    flag2=false;
            }
        }
        if(row+i<8&&col-i>-1)
        {
            if(board[index+7*i].isOccupied===true)
            {
                if(board[index+7*i].color==="black"&&board[index+7*i].piece==="bishop"&&flag3===true)
                    bishopInSight=true;
                else 
                    flag3=false;
            }
        }
        if(row+i<8&&col+i<8)
        {
            if(board[index+9*i].isOccupied===true)
            {
                if(board[index+9*i].color==="black"&&board[index+9*i].piece==="bishop"&&flag4===true)
                    bishopInSight=true;
                else 
                    flag4=false;
            }
        }
    }
    return bishopInSight
}
function inCheckByQueen({index,board})
{
    return (inCheckByBishop({index,board})||inCheckByRook({index,board}))
}
export {inCheck}