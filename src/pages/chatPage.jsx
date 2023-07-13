import ContactSection from "../components/contactSection";
import ChatSection from "../components/chatSection";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { ChatContext, UserContext } from "../contexts";
import useSocket from "../hooks/useSocket";
import useFetch from "../hooks/useFetch";
function ChatPage(props){
    const {chatState} = useContext(ChatContext)
    const {user} = useContext(UserContext)
    const [chats,setChats] = useState([]);
    const [loading,setLoading] = useState(true)

    useFetch({url:'/chat',method:"get",config:{user}},[],(data,error,loading)=>{
        if(data){
            console.log(data)
            setChats(() => data && data.response.flatMap((ele) => {
                    const {users} = ele
                    const receiver = users.filter((i)=>i.userName!==user.userName)
                    console.log(receiver)
                    return ele.chatType==="group"?{...ele,chatId:ele._id}:{users:receiver,chatId:ele._id,chatType:ele.chatType,chatName:ele.chatName||receiver[0]&&receiver[0].userName,lastMessage:ele.lastMessage,profilePic:ele.profilePic||receiver[0]&&receiver[0].profilePic}
              }))
            setLoading(false)
        }
    })

    useEffect(()=>{
        console.log(chats)
    },[chats])

    return(
        <section className="chat-page-wrapper ps-12 grid grid-cols-12 grid-flow-col">
            <div className={`col-span-12 ${!chatState.chatId?"":"hidden"} sm:grid sm:col-span-4 lg:col-span-3`}>
                <ContactSection loading={loading} chats={chats} setChats={setChats} chatType={props.chatType}></ContactSection>
            </div>
            <div className={`shadow-lg shadow-dark col-span-12 ${chatState.chatId?"":"hidden"} sm:grid sm:col-span-9 md:col-span-8 lg:col-span-9`}>
                {chatState.chatId?<ChatSection loading={loading} chats={chats} setChats={setChats}></ChatSection>:
                <h1 className="text-primary text-2xl text-center inline-block m-auto">Please select the chat to view</h1>
                }
            </div>
        </section>
    )
}

export default ChatPage