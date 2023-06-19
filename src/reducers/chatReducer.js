/*
    chatState = {
        chatid:string,
        chatName:string,
        isGroupChat:Boolean,
        groupMembers:[
            {
            userId:string
            userName:string
            fname:string
            lname:string
            profilePic:string
            email:string 
            isAdmin:Boolean
        }...,
        messages:[
                messageId:string,
                content:string,
                messageTime:string
            ]
        ],
    }

*/

const chatDispatch = (state,action)=>{
    const {payload} = action
    switch(action.type){
        case "SET_CHAT":
            return {...state,chatId:payload.chatId,chatName:payload.chatName,isGroupChat:payload.isGroupChat,chatImage:payload.chatImage}
        case "ADD_GROUP_MEMBERS":
            return state 
        case "REMOVE_GROUP_MEMBERS":
            return state
        case "RENAME_GROUP":
            return {...state,chatName:payload}
        case "SEND_MESSAGE":
            //to update the read_by
            return state
        case "SET_CHAT_MESSAGES":
            return {...state,messages:payload}
        case "UPDATE_MESSAGE":
            return {...state,messages:payload}
            //to update the read_by
            //update reciever side messages
        case "DELETE_MESSAGE":
            return state
        case "CHANGE_ADMIN":
            return state        
    }
}

export default chatDispatch