import { useContext, useEffect, useState } from "react";
import Contact from "./contact";
import SearchBar from "./search";
import { apiInstance } from "../hooks/useFetch";
import { ChatContext, UserContext } from "../contexts";

function ContactSection(props){
    const [contacts,setContacts] = useState([]);

    const [messages,setMessages] = useState([]);
 
    const {user} = useContext(UserContext) 
    const {chatState,chatDispatch} = useContext(ChatContext)

    function fetchChats(){
        apiInstance.get('/chat',{headers:{'Authorization':"Bearer "+user.token}})
                   .then((res)=>{
                    const data = res.data
                    // only for indivisual chats
                    setContacts(() => data.response.flatMap((ele) => {
                        const {users} = ele
                        return users.filter((i) =>(i.userName !== user.userName)).map((i)=>({...i,chatId:ele._id}))
                      })
                      )
                   })
                   .catch((err)=>console.log(err))
    }

    useEffect(()=>{
        fetchChats()
    },[])

    useEffect(()=>{
    },[contacts])

    return(
        <section className="contact-section flex flex-col gap-2 p-2 bg-dark shadow-md border-e-2 border-primary h-screen">
            <div className="pb-3 space-y-2 border-b-[1px] border-secondary">
            <h1 className="text-2xl text-center text-white">{props.chatType.toLowerCase().charAt(0).toUpperCase() + props.chatType.slice(1)} Chat</h1>
            <SearchBar></SearchBar>
            </div>
            <div className="contacts-wrapper relative overflow-auto flex gap-2 justify-center flex-col items-center">
                {
                    contacts.length?(contacts.map((i)=>(
                        <Contact onClick={()=>chatDispatch({type:"SET_CHAT",payload:{chatId:i.chatId,chatName:i.userName,chatImage:i.profilePic,isGroupChat:false}})} key={i.chatId} profilePic={i.profilePic} userName={i.userName} active={chatState.chatId==i.chatId}></Contact>
                    ))) : <h1 className="text-primary text-2xl text-center font-mono inline-block m-auto">No chats here!!! <br/> Create a chat by choosing the option in the menu</h1>    
                }
            </div>
        </section>
    )
}

export default ContactSection; 