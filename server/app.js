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
    socket.on('disconnect',()=>delete players[socket.id])
})