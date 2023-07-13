import { useContext, useEffect, useRef, useState } from "react";
import Contact from "./contact";
import SearchBar from "./search";
import { ChatContext, UserContext } from "../contexts";
import {PacmanLoader} from 'react-spinners';


function ContactSection(props){
    const {user} = useContext(UserContext) 
    const {chatState,chatDispatch} = useContext(ChatContext)
    const [searchQuery,setSearchQuery] = useState()

    useEffect(()=>{
        console.log(props.chats)
    },[props.chats])
    

    useEffect(()=>{
    },[searchQuery])

    return(
        <section className="contact-section flex flex-col gap-2 p-2 bg-dark shadow-md border-e-2 border-primary h-screen">
            <div className="pb-3 space-y-2 border-b-[1px] border-secondary">
            <h1 className="text-2xl text-center text-white">{props.chatType=="indivisual"?"User":"Group"} Chat</h1>
            <SearchBar setSearchQuery={setSearchQuery}></SearchBar>
            </div>
            <div className="chats-wrapper relative overflow-auto flex gap-2 justify-center flex-col items-center">
                {props.loading&&<PacmanLoader
                              className="text-primary"
                              color="#7754B2"
                              size={30}
                            />}
                {!props.loading&&(
                    searchQuery?(
                        props.chats.filter((i) => i.userName.includes(searchQuery)).length === 0 ? (
                            <h1 className="text-primary text-2xl text-center font-mono inline-block m-auto">
                              No chats with {searchQuery} are found
                            </h1>
                          ) :
                        props.chats.filter((i)=>{
                            return i.userName.includes(searchQuery)})
                                   .map(i=><Contact onClick={()=>chatDispatch({
                                                type:"SET_CHAT",
                                                payload:{
                                                    chatId:i.chatId,
                                                    chatName:i.chatName,
                                                    chatImage:i.profilePic,
                                                    isGroupChat:i.chatType==="group",
                                                    users:i.users
                                                }
                                                })} 
                                            key={i.chatId} 
                                            profilePic={i.profilePic} 
                                            userName={i.chatName} 
                                            lastMessage={i.lastMessage&&i.lastMessage.content}
                                            active={chatState.chatId==i.chatId}>
                                            </Contact>)
                    ):
                    (
                        props.chats.filter((ele)=>ele.chatType==props.chatType).length?(
                        props.chats.filter((ele)=>ele.chatType==props.chatType).map((i)=>{
                            return <Contact onClick={()=>chatDispatch({
                                                            type:"SET_CHAT",
                                                                payload:{
                                                                    chatId:i.chatId,
                                                                    chatName:i.chatName,
                                                                    chatImage:i.profilePic,
                                                                    isGroupChat:i.chatType==="group",
                                                                    users:i.users
                                                                }
                                                            })} 
                                            key={i.chatId} 
                                            profilePic={i.profilePic} 
                                            userName={i.chatName} 
                                            active={chatState.chatId==i.chatId}
                                            lastMessage={i.lastMessage&&i.lastMessage.content}
                                            messageState={i.lastMessage&&i.lastMessage.timeStamp}
                                            lastMessageSender = {i.lastMessage&&i.lastMessage.sender.userName}
                                            ></Contact>
                        })):(<h1>No group Chats</h1>)
                    )
                    
                )}
            </div>
        </section>
    )
}

export default ContactSection; 