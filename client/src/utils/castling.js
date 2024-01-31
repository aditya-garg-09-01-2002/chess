import { inCheck } from "./check";

function checkKingSideCastling({board,from,to,piece})
{
    if(board[60].moved===false&&board[63].moved==false)
    {
        if(board[61].isOccupied===false&&board[62].isOccupied===false)
        {
            board[60].isOccupied=false;
            if(inCheck({index:61,board,from,to,piece})===false&&inCheck({index:62,board,from,to,piece})===false)
            {
                board[60].isOccupied=true;
                return true;
            }
            board[60].isOccupied=true;
        }
    }
    return false;
}
function checkQueenSideCastling({board,from,to,piece})
{
    if(board[60].moved===false&&board[56].moved===false)
    {
        if(board[57].isOccupied===false&&board[58].isOccupied===false&&board[59].isOccupied===false)
        {
            board[60].isOccupied=false;
            if(inCheck({index:57,board,from,to,piece})===false&&inCheck({index:58,board,from,to,piece})===false&&inCheck({index:59,board,from,to,piece})===false)
            {
                board[60].isOccupied=true;
                return true;
            }
            board[60].isOccupied=true;
        }
    }
    return false;
}

export {checkKingSideCastling,checkQueenSideCastling}