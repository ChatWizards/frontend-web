import React, { useEffect, useReducer } from "react"
import chatReducer from '../reducers/chatReducer'

const ChatContext = React.createContext({});

let initialState = {
    chatid:"",
    chatName:"",
    chatImage:"",
    groupMembers:[],
    isGroupChat:true,
    messages:[],
}


export default function ChatProvider(props){
    const [chatState, chatDispatch] = useReducer(chatReducer, initialState);
    useEffect(()=>{
        console.log(chatState)
    },[chatState])
    return(
        <ChatContext.Provider value={{chatState,chatDispatch}}>
            {props.children}
        </ChatContext.Provider>
    )
}

export {ChatContext}