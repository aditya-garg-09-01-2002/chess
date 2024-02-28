const express=require('express')
const socketIO=require('socket.io')
const appConfig=require('./config/setup')
const cors=require('cors')
const app=express()

app.use(cors());

const server=app.listen(appConfig.Port,()=>console.log('connected to server...'))

const io=socketIO(server,{cors:{}})

let attendees=-1;
let pairs={};
io.on('connection',socket=>{
    if(attendees==-1)
        attendees=socket.id;
    else
    {
        const playerOne=attendees;
        const playerTwo=socket.id;
        attendees=-1;
        pairs[playerOne]={opponent:playerTwo,isChance:true}
        pairs[playerTwo]={opponent:playerOne,isChance:false}
        io.to(playerOne).emit('you-start')
        io.to(playerOne).emit('player-matched');
        io.to(playerTwo).emit('player-matched');
    }
    socket.on('mychance',()=>{
        if(typeof pairs[socket.id]==='undefined')
        {
            socket.emit('wait for other player to join')
            return ;
        }
        if(pairs[socket.id].isChance===true)
            socket.emit('your-chance-true')
        else 
            socket.emit('your-chance-false')
    })
    socket.on('have-castled',({side})=>{
        pairs[socket.id].isChance=false;
        const otherPlayerID=pairs[socket.id].opponent;
        pairs[otherPlayerID].isChance=true;
        io.to(otherPlayerID).emit('castle-opponent',{side})
    })
    socket.on('check-mate',()=>{
        io.to(pairs[socket.id].opponent).emit('you-won');
    })
    socket.on('have-moved',({from,to,piece})=>{
        socket.emit('check-status')
        
        pairs[socket.id].isChance=false;
        const otherPlayerID=pairs[socket.id].opponent;
        pairs[otherPlayerID].isChance=true;
        // Converting index from my perspective to opponent perspective
        io.to(otherPlayerID).emit('opponent-move',{to:56-to+2*(to%8),from:56-from+2*(from%8),piece})
    })
    socket.on('promote-pawn',({index,piece})=>{
        io.to(pairs[socket.id].opponent).emit('pawn-promotion',{index:56-index+2*(index%8),piece})
    })
    socket.on('disconnect',()=>{
        if(attendees===socket.id)
            attendees=-1;
        if(typeof pairs[socket.id]!=='undefined')
            if(typeof pairs[socket.id].opponent!=='undefined')
            {
                io.to(pairs[socket.id].opponent).emit('other-player-left');
                delete pairs[pairs[socket.id].opponent];
                delete pairs[socket.id];
            }
    })
})