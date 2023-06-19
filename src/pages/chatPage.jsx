import ContactSection from "../components/contactSection";
import ChatSection from "../components/chatSection";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { ChatContext } from "../contexts";

function ChatPage(props){
    const {chatState} = useContext(ChatContext)
    
    return(
        <section className="chat-page-wrapper ps-12 grid grid-cols-12 grid-flow-col">
            <div className="col-span-12 sm:col-span-4 lg:col-span-3">
                <ContactSection chatType={props.chatType}></ContactSection>
            </div>
            <div className="col-span-9 hidden sm:grid md:col-span-8 lg:col-span-9">
                {chatState.chatId?<ChatSection></ChatSection>:
                <h1 className="text-primary text-2xl text-center inline-block m-auto">Please select the chat to view</h1>
                }
            </div>
        </section>
    )
}

export default ChatPage