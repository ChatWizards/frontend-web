import { GroupMessage, MessagePrimary } from "./message"
import Chatbar from "./chatBar"
import {ChatContext,UserContext,ToastContext} from '../contexts'
import { createRef,useMemo, useContext, useRef, useState,useReducer, useEffect } from "react"
import {CircleLoader,SyncLoader} from 'react-spinners';
import { apiInstance } from "../hooks/useFetch" 
import ChatMenu from "./chatMenu"

function ChatSection(props){
    const {chatState,chatDispatch} = useContext(ChatContext)
    const {user,socket} = useContext(UserContext)
    const {setToastMsg} = useContext(ToastContext)
    const [messages,setMessages] = useState([])
    const [files,setFiles] = useState([])
    const [activeMenu,setActiveMenu] = useState(false)
    const [search,setActiveSearch] = useState(false)
    const [loading,setLoading] = useState(true)
    const [msgLoader,setMessageLoader] = useState(false)
    let type = "primary"
    
    const chatBarRef = useRef(null)
    const chatOverflowRef = useRef(null)

    useEffect(()=>{
        function socketCallback(data){
            if(data.status==201){
                setMessages((prev)=>([...prev,data.response.message]))
                setMessageLoader(false)
            }
            props.setChats((prev)=>(
                prev.map((ele)=>{
                    if(ele.chatId==chatState.chatId){
                        return {...ele,lastMessage:data.response.message}
                    }
                    return ele
                })
            )) 
        }
        socket.on("message",socketCallback)
        return ()=>{
            socket.off("message",socketCallback)
        }

    },[])

    const sendMessage = ()=>{
        const message = chatBarRef.current.value;
        // console.log(chatBarRef,message)
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
        socket.emit("message",{chatId:chatState.chatId,messageContent:message})
        setMessageLoader(true)
        // apiInstance.post('/chat/send',
        //     {chatId:chatState.chatId,messageContent:chatBarRef.current.value},
        //         {headers:{'Authorization':"Bearer "+user.token}})
        //     .then((res)=>{
        //         const {data} = res
        //     })
        //     .catch((err)=>{
        //         const {data} = err.response
        //         setToastMsg({type:"error",message:data.message})
        //     })
        chatBarRef.current.value = ""
    }

    const renameChat = (new_name)=> {
        if(chatState.isGroupChat){
            chatDispatch({type:"RENAME_GROUP",payload:new_name})
        }
    }

    useEffect(()=>{
        if(chatState.chatId){
            apiInstance.post('/chat/getMessages',
                {chatId:chatState.chatId},
                {headers:{'Authorization':"Bearer "+user.token}})
            .then((res)=>{
                const {data} = res
                setMessages(data.response)
                setLoading(false)
            })
        }
    },[chatState.chatId])

    useEffect(()=>{
        chatDispatch({type:"SET_CHAT_MESSAGES",payload:messages}) 
        console.log(messages)
        const scrollToBottom = () => {
            if (chatOverflowRef.current) {
                setTimeout(() => {
                    chatOverflowRef.current.scrollTop = chatOverflowRef.current.scrollHeight;
                }, 10);        
            }
          };
        scrollToBottom()
    },[messages])

    const parseTime = (i)=>{
        let time = i.substr(12,4)
        return time
    }

    return(
        <section className="grid chat-section relative w-full bg-secondary h-screen">
            <div className="w-full border-b-2 flex row-span-1 items-center h-[60px] justify-between pe-10">
                <div className="ps-4 flex items-center gap-2">
                    <img src={chatState.chatImage||`icons/${chatState.chatType=="individual"?"user":"group"}_chat.svg`} height={40} width={40} className="rounded-full" alt="" />
                    <h3 className="contact-name text-xl font-semibold text-white font-mono uppercase">{chatState.chatName||"user1"}</h3>
                </div>
                {/* <span className="search">add search among messages feature</span> */}
                <div id="chat-header-icons relative" className="flex gap-2">
                    <button className={`text-primary p-1 w-8 h-8 flex items-center justify-center border-[1px] duration-300 cursor-pointer shadow-lg shadow-dark border-primary rounded-full hover:bg-primary hover:text-black`} onClick={()=>setActiveSearch((prev)=>!prev)}>
                        <img src="/icons/search.svg" className="p-1" alt="..."/>    
                    </button>  
                    <button className={`text-primary p-1 w-8 h-8 flex items-center justify-center border-[1px] duration-300 cursor-pointer shadow-lg shadow-dark border-primary rounded-full hover:bg-primary hover:text-black`} onClick={()=>setActiveMenu((prev)=>!prev)}>
                        <img src="/icons/options-dots.png" className="p-1" alt="..."/>    
                    </button>                
                    <button className={`text-primary p-1 w-8 h-8 flex items-center justify-center border-[1px] duration-300 cursor-pointer shadow-lg shadow-dark border-primary rounded-full hover:bg-primary hover:text-black`} onClick={()=>{chatDispatch({type:"GO_BACK",payload:""})}}>
                        <img src="icons/back.png" className="p-1" alt="<-" />
                    </button>
                    <ChatMenu activeMenu={activeMenu} setChats={props.setChats}></ChatMenu>
                </div>
            </div>
            {loading&&<CircleLoader
                      className="m-auto"
                      color="#7754B2"
                      cssOverride={{}}
                      loading
                      size={148}
                      speedMultiplier={0.75}
                    />}
            <div className="w-full overflow-y-scroll relative py-2 px-4" ref={chatOverflowRef}>
            {!loading&&!chatState.messages.length&&(
                <h1 className="inline-block text-2xl absolute top-1/2 left-1/2 -translate-x-1/2">No messages in the conversation</h1>
            )}
            {!loading&&chatState.messages.map((ele,index)=>{
                type = ele.sender.userName==user.userName?"primary":"secondary"
                return chatState.isGroupChat? <GroupMessage key={ele._id} type={type} message={ele.content} image={ele.sender.profilePic} userName={ele.sender.userName} messageTime={parseTime(ele.timeStamp)}/>:
                <MessagePrimary key={ele._id} type={type} message={ele.content} image={ele.sender.profilePic} messageTime={parseTime(ele.timeStamp)}/>
            })}
            </div>
            <div className="w-full px-2 bg-dark flex relative items-center h-[60px]">
                {msgLoader&&
                    <div className="absolute -top-5 left-2">
                        <SyncLoader
                          color="#7c7e91"
                          margin={2}
                          size={7}
                          speedMultiplier={.75}
                        />
                    </div>
                }
                <Chatbar ref={chatBarRef} sendMessage={sendMessage}></Chatbar>
            </div>

        </section>
    )
}

export default ChatSection