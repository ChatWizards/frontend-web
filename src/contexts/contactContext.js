import { createContext, useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { UserContext } from "./userContext";

const ContactContext = createContext({})

function ContactProvider(props){
    const {user} = useContext(UserContext)
    const [contacts,setContacts] = useState([])

    useFetch({url:"/user/contacts",method:"get",config:{user}},[user],(data,error,loading)=>{
        if(data){
          setContacts(data.response.contacts)
          console.log("contacts:",data.response.contacts)
        }
      })

    return(
        <ContactContext.Provider value={{contacts,setContacts}}>
            {props.children}
        </ContactContext.Provider>
    )    
}

export default ContactProvider
export {ContactContext}