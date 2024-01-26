const express=require('express')
const socketIO=require('socket.io')
const appConfig=require('./config/setup')
const cors=require('cors')
const app=express()

app.use(cors());

const server=app.listen(appConfig.Port,()=>console.log('connected to server...'))