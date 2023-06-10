import React, { useContext, useState } from "react"

const UserContext = React.createContext({});

export default function UserProvider(props){
    const [user,setUser] = useState({})
    return(
        <UserContext.Provider value={{user,setUser}}>
            {props.children}
        </UserContext.Provider>
    )
}