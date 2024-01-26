const express=require('express')
const socketIO=require('socket.io')
const appConfig=require('./config/setup')
const cors=require('cors')
const app=express()

app.use(cors());

const server=app.listen(appConfig.Port,()=>console.log('connected to server...'))

const io=socketIO(server,{cors:{}})

let players={},audience=[];

io.on('connection',socket=>{
    if(Object.keys(players).length<2)
        players[socket.id]={isChance:Object.keys(players).length===0}
    else 
        audience.push(socket.id)
    socket.on('mychance',()=>{
        console.log(socket.id,players[socket.id].isChance)
        if(players[socket.id].isChance)
            socket.emit('your-chance-true')
        else 
            socket.emit('your-chance-false')
    })
    socket.on('have-moved',({from,to,piece})=>{
        players[socket.id].isChance=false;
        const otherPlayerID=Object.keys(players).find(id=>id!==socket.id);
        players[otherPlayerID].isChance=true;
        // Converting index from my perspective to opponent perspective
        io.to(otherPlayerID).emit('opponent-move',{to:64-to,from:64-from,piece})
    })
    socket.on('disconnect',()=>delete players[socket.id])
})