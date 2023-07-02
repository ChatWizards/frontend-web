import { useEffect, useMemo, useState } from "react";
import {io} from 'socket.io-client'


function useSocket(user){
    const [socket,setSocket] = useState(null)

    function updateChatId(){

    }

    useMemo(()=>{
        function setupSocket(){
            if(user &&user.token && !socket){
                const socketIo = io(process.env.REACT_APP_BACKEND_SOCKET_URL,{auth:{token:user.token}})
                console.log("socket called")

                if(socketIo){
                    if(!user || !user&&user.token){
                        socketIo.disconnect()
                    }
                    socketIo.on("connect_error", (err) => {
                        if (err.message === "invalid credentials") {
                            console.log("Unauthorized user")
                        }
                        if(err.message === ""){}
                        console.log(err.message)
                        setSocket(null);

                    });
                    socketIo.on("connect",(data)=>{
                        console.log("connected to server",socketIo.id)
                    })
                    socketIo.on("active_user",(data)=>{
                        console.log(data)
                    })
                    socketIo.on("message",(data)=>{
                        console.log(data)
                    })
                    socketIo.on("error", (error) => {
                        console.log("Socket error:", error);
                    });
                    setSocket(socketIo)
                }   
            }
        }
        setupSocket()
    },[user.token])

    
    return [socket,updateChatId]
}

export default useSocket;