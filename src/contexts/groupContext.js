import React, { useContext, useState } from "react"

const GroupContext = React.createContext({});

export default function UserProvider(props){
    const [grpMem,setGrpMem] = useState({})
    return(
        <GroupContext.Provider value={{grpMem,setGrpMem}}>
            {props.children}
        </GroupContext.Provider>
    )
}
