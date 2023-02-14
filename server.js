

// const { kMaxLength } = require('buffer');
const formatMessage=require('./utils/messages')
const {userJoin,getCurrentUser,getRoomUsers,userLeave}=require('./utils/users')
const express=require('express')
const http=require('http')
const path=require('path')
const socketio=require('socket.io')

const app=express();

//set static folder

app.use(express.static(path.join(__dirname,'public')))

const server=http.createServer(app)
const io=socketio(server)

const PORT=process.env.PORT||3000

server.listen(PORT,()=>{
    console.log('serever listenig on port '+PORT)
})

io.on('connection',(socket)=>{
    socket.on('joinRoom',({username,room})=>{
        const user=userJoin(socket.id,username,room)
    socket.join(user.room)

      //welcoe message to the particular socket 
   socket.emit('message',formatMessage('chatCord Bot','welcome to the chatCord'))
   
   //WHEN A NEW USER JOIN THE CHAT
        socket.broadcast.to(user.room).emit('message',formatMessage('chatCord Bot',`${user.username} joined the chat`))
        //send user and room info
        io.to(user.room).emit('roomUsers',{
            room:user.room,
            users:getRoomUsers(user.room)
        })

   //when a user disconnects
        socket.on('disconnect',()=>{
            const  user = userLeave(socket.id)
            if(user){
                io.to(user.room).emit('message',formatMessage('chatCord Bot',`${user.username} left the chat`))
              //send users and room info
                io.to(user.room).emit('roomUsers',{
                    room:user.room,
                    users:getRoomUsers(user.room)
                })
        
            }
          
         })
    //THE CHAT MESSAGES GUYS
         socket.on('chatMessage',(msg)=>{
  
            io.to(user.room).emit('message',formatMessage(user.username,msg))
           }) //THIS SOCKET.ON SHOULD BE ON THE ROOM MOTHERFUCKER
           
        
    })
   console.log('new connection made')

   //when a user leave the chat room or when they are disconnected

    //listening to the message from the client


      
}) 

