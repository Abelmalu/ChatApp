const users=[]
//join user to chat
function userJoin(id,username,room){
    const user={id,username,room}
    users.push(user)
    return user;
}//end of the userJoin method


//get the current user

function getCurrentUser(id){
    return users.find(users.id===id)
}

//user leaves chat

function userLeave(id){
    const index= users.findIndex(user=>user.id===id)
    if(index !== -1){
        return users.splice(index,1)[0]
    }
}


function getRoomUsers(room){
    return users.filter(user=>user.room===room)
}


module.exports={
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers

}


//  


