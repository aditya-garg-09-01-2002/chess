import { getPossibleMoves } from "./moves"
function select(index,TilesRef,board){
    if(board[index].isOccupied===true&&board[index].color==="white")
    {
        let moves=[index];
        const piece=board[index].piece
        if(piece==="pawn")
        {
            moves=moves.concat(getPossibleMoves("pawn",index,board))
        }
        else if(piece==="knight")
        {
            moves=moves.concat(getPossibleMoves("knight",index,board))
        }
        else if(piece==="rook")
        {
            moves=moves.concat(getPossibleMoves("rook",index,board))
        }
        else if(piece==="bishop")
        {
            moves=moves.concat(getPossibleMoves("bishop",index,board))
        }
        else if(piece==="queen")
        {
            moves=moves.concat(getPossibleMoves("queen",index,board))
        }
        else if(piece==="king")
        {
            moves=moves.concat(getPossibleMoves("king",index,board))
        }
        moves.forEach((i)=>TilesRef[i].current.classList.add('tile-selected'))
        moves.forEach((ind,index)=>{
            if(index!=0)
            {
                board[ind].canMoveTo=true;
            }
        })
        return moves;
    }
    else 
        return []
}
function deselect(TilesRef,otherSelected,board)
{
    otherSelected.forEach((ind)=>{
        board[ind].canMoveTo=false;
        TilesRef[ind].current.classList.remove('tile-selected')
    });
    return board;
}

export {select,deselect}