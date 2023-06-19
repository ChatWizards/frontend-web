import { GroupMessage, MessagePrimary } from "./message"
import Chatbar from "./chatBar"
import {ChatContext,UserContext,ToastContext} from '../contexts'
import { createRef, useContext, useRef, useState,useReducer, useEffect } from "react"
import { apiInstance } from "../hooks/useFetch" 

// import {messages} from '../Chatdata'

function ChatSection(props){
    const {chatState,chatDispatch} = useContext(ChatContext)
    const {user} = useContext(UserContext)
    const {setToastMsg} = useContext(ToastContext)
    const [messages,setMessages] = useState([])
    let type = "primary"
    
    const chatBarRef = useRef(null)

    const sendMessage = ()=>{
        const message = chatBarRef.current.value;
        const time = new Date()
        let messageTime = ""
        let status = "AM"
        if(time.getHours()>12){
            time.setHours(time.getHours()-12)
            status = "PM"
        }   
        if(time.getHours()==0){
            time.setHours(12) 
        }
        messageTime = time.getHours()+":"+time.getMinutes()+" "+status
        apiInstance.post('/chat/send',
            {chatId:chatState.chatId,messageContent:chatBarRef.current.value},
                {headers:{'Authorization':"Bearer "+user.token}})
            .then((res)=>{
                const data = {res}
                console.log(data)
            })
            .catch((err)=>{
                console.log(err)
                const {data} = err.response
                setToastMsg({type:"error",message:data.message})
            })
        chatBarRef.current.value = ""
    }

    const renameChat = (new_name)=> {
        if(chatState.isGroupChat){
            chatDispatch({type:"RENAME_GROUP",payload:"thunder_buddies"})
        }
    }

    useEffect(()=>{
        console.log("fetching")
        if(chatState.chatId){
            apiInstance.post('/chat/getMessages',
                {chatId:chatState.chatId},
                {headers:{'Authorization':"Bearer "+user.token}})
            .then((res)=>{
                const {data} = res
                setMessages(data.response)
            })
        }
    },[chatState.chatId,chatState.messages])

    useEffect(()=>{
        chatDispatch({type:"SET_CHAT_MESSAGES",payload:messages})
    },[messages])

    const parseTime = (i)=>{
        let time = i.substr(12,4)
        return time
    }

    return(
        <section className="grid chat-section relative w-full bg-secondary h-screen">
            <div className="w-full border-b-2 flex row-span-1 items-center h-[60px] justify-between pe-10">
                <div className="ps-4 flex items-center gap-2">
                    <img src="/logo.svg" height={40} width={40} className="rounded-full" alt="" />
                    <h3 className="contact-name text-xl font-semibold text-white font-mono uppercase">{chatState.chatName||"user1"}</h3>
                </div>
                {/* <span className="search">add search among messages feature</span> */}
                <div id="chat-header-icons" className="flex gap-2">
                    <button className={`text-primary p-1 w-8 h-8 flex items-center justify-center border-[1px] duration-300 cursor-pointer shadow-lg shadow-dark border-primary rounded-full hover:bg-primary`} onClick={()=>renameChat("new_name")}>✏️</button>
                    <button className={`text-primary p-1 w-8 h-8 flex items-center justify-center border-[1px] duration-300 cursor-pointer shadow-lg shadow-dark border-primary rounded-full hover:bg-primary hover:text-black`}>...</button>                
                </div>
            </div>
            <div className="w-full overflow-y-scroll relative py-2 px-4">
            {!chatState.messages.length&&(
                <h1 className="inline-block text-2xl absolute top-1/2 left-1/2 -translate-x-1/2">No messages in the conversation</h1>
            )}
            {chatState.messages.map((ele,index)=>{
                type = ele.sender.userName==user.userName?"primary":"secondary"
                return chatState.isGroupChat? <GroupMessage key={ele._id} type={type} message={ele.content} image={ele.sender.profilePic} userName={ele.sender.name} messageTime={parseTime(ele.timeStamp)}/>:
                <MessagePrimary key={ele._id} type={type} message={ele.content} image={ele.sender.profilePic} messageTime={parseTime(ele.timeStamp)}/>
            })}
            </div>
            <div className="w-full px-2 bg-dark flex items-center h-[60px]">
                <Chatbar ref={chatBarRef} sendMessage={sendMessage}></Chatbar>
            </div>

        </section>
    )
}

export default ChatSection