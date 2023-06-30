import ContactSection from "../components/contactSection";
import ChatSection from "../components/chatSection";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { ChatContext, UserContext } from "../contexts";
import useSocket from "../hooks/useSocket";

function ChatPage(props){
    const {chatState} = useContext(ChatContext)

    const [chats,setChats] = useState([]);

    useEffect(()=>{
        console.log(chats)
    },[chats])

    return(
        <section className="chat-page-wrapper ps-12 grid grid-cols-12 grid-flow-col">
            <div className={`col-span-12 ${!chatState.chatId?"":"hidden"} sm:grid sm:col-span-4 lg:col-span-3`}>
                <ContactSection chats={chats} setChats={setChats} chatType={props.chatType}></ContactSection>
            </div>
            <div className={`shadow-lg shadow-dark col-span-12 ${chatState.chatId?"":"hidden"} sm:grid sm:col-span-9 md:col-span-8 lg:col-span-9`}>
                {chatState.chatId?<ChatSection chats={chats} setChats={setChats}></ChatSection>:
                <h1 className="text-primary text-2xl text-center inline-block m-auto">Please select the chat to view</h1>
                }
            </div>
        </section>
    )
}

export default ChatPage