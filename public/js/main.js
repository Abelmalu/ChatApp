// const chatForm = document.getElementById('chat-form');
// const chatMessages = document.querySelector('.chat-messages');
// const roomName = document.getElementById('room-name');
// const userList = document.getElementById('users');

// // Get username and room from URL
// const { username, room } = Qs.parse(location.search, {
//   ignoreQueryPrefix: true,
// });

// const socket = io();

// // Join chatroom
// socket.emit('joinRoom', { username, room });

// // Get room and users
// socket.on('roomUsers', ({ room, users }) => {
//   outputRoomName(room);
//   outputUsers(users);
// });

// // Message from server
// // socket.on('message', (message) => {
// //   console.log(message);
// //   outputMessage(message) 

const chatForm=document.getElementById('chat-form')

const chatMessages=document.querySelector('.chat-messages ')
const roomName =document.getElementById('room-name')
const userList =document.getElementById('users')

//get usename and room form URL
const {username,room}=Qs.parse(location.search,{
    ignoreQueryPrefix:true
})
console.log(username,room)
console.log('hellow guys')
 
const socket=io.connect('http://localhost:3000')

//join the room
socket.emit('joinRoom',{username,room})

socket.on('message',message=>{
    console.log(message)
    outputMessage(message)
    //scroll down motherfucker
    chatMessages.scrollTop=chatMessages.scrolHeight;
})

//message submit
chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    let msg=document.getElementById('msg').value


    //emiting messageto sthe server
    socket.emit('chatMessage',msg)
 
  msg.value='';
    
})// end of the addEventListener
// et room and users
socket.on('roomUsers',({room,users})=>{
  outputRoomName(room);
  outputUsers(users)
})

//output message to the DOM 

function outputMessage(message){
const div=document.createElement('div');
div.classList.add('message')
div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
<p class="text">
    ${message.text}
</p> `
document.querySelector('.chat-messages').appendChild(div)
}

//add room name to DOM
function outputRoomName(room){
roomName.innerText=room;

}

//add user to DOM

function outputUsers(users){
    userList.innerHTML=`  ${users.map(user=>`<li>${user.username}</li>`).join('')}`
}
