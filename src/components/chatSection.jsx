import { MessagePrimary } from "./message"
import Chatbar from "./chatBar"
import { createRef, useRef, useState } from "react"

function ChatSection(props){
    const [chat,setChat] = useState([
        {type:"primary",img:"/icons/logo.svg",message:"this is a test Message",messageTime:"9:30PM"},
        {type:"secondary",img:"/icons/send.svg",message:"this is a test Message",messageTime:"9:30PM"},
        {type:"primary",img:"/icons/logo.svg",message:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",messageTime:"9:30PM"},
        {type:"secondary",img:"/icons/send.svg",message:"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",messageTime:"9:30PM"},
        {type:"secondary",img:"/icons/send.svg",message:"Surprise Mother Fucker",messageTime:"9:30PM"},
        {type:"primary",img:"/icons/logo.svg",message:"this is not a test message",messageTime:"9:30PM"}
    ])
    
    const chatBarRef = useRef(null)

    const sendMessage = ()=>{
        const message = chatBarRef.current.value;
        const time = new Date()
        let messageTime = ""
        let status = "AM"
        console.log(time.getHours(),time.getMinutes())
        if(time.getHours>12){
            time.setHours(time.getHours()-12)
            status = "PM"
        }   
        messageTime = time.getHours()+":"+time.getMinutes()+" "+status
        setChat((prev)=>(
            [...prev,{type:"primary",img:"/icons/logo.svg",message:message,messageTime:messageTime}]
        ))
        chatBarRef.current.value = ""
    }

    return(
        <section className="chat-section relative w-full bg-secondary h-screen grid grid-flow-row">
            <div className="w-full py-4 border-b-2">
                <h3 className="contact-name text-xl font-semibold text-white ps-4 font-mono uppercase">{props.userName||"user1"}</h3>
                {/* <span className="search">add search among messages feature</span> */}
            </div>
            <div className="w-full overflow-y-scroll relative">
                {
                    chat.map((i,index)=>(
                        <MessagePrimary key={index} {...i}/>                        
                    ))
                }
            </div>
            <div className="w-full p-2 bg-dark">
                <Chatbar ref={chatBarRef} sendMessage={sendMessage}></Chatbar>
            </div>
            {/* {props.messages&&props.messages.length?"":(
                <h1 className="inline-block text-2xl absolute top-1/2 left-1/2 -translate-x-1/2">No messages in the conversation</h1>
            )} */}
        </section>
    )
}

export default ChatSection