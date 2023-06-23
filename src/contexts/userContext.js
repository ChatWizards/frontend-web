import React, { useContext, useEffect, useState } from "react"
import useSessionStorage from '../hooks/useSessionStorage'

const inialState = {userName:"",token:"",profilePic:"",email:""}
const UserContext = React.createContext(inialState);

export default function UserProvider(props){
    const [user,setUser] = useSessionStorage("user",{})
    
    useEffect(()=>{
        console.log(user)
    },[user])

    return(
        <UserContext.Provider value={{user,setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export {UserContext};