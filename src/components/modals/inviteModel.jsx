import SearchBar from "../search";
import Invite from '../invite'
import { useState } from "react";

export default function InviteModal(){
    const [invites,setInvites] = useState([])
    function fetchInvites(){

    }

    function sendInvite(){

    }
    return(
        <>
        <div className="px-4 py-2 bg-dark" id="send-invite">
            <SearchBar></SearchBar>
        </div>    
        <div className="" id="invites">
            {
                invites.map((ele)=>(
                    <article className="invite w-full h-16 flex gap-2 relative rounded-md border-[1px] border-primary">
                    <div className="flex items-center w-fit h-full ps-2">
                        <img src={ele.profilePic} className="rounded-full bg-primary" height={50} width={50}/>
                    </div>
                    <article className="flex items-center">
                        <p className="invitation-header flex flex-col relative">
                            <span className="text-lg text-primary">{ele.userName}</span>
                            <span className="text-sm text-white ps-2">{ele.inviteStatus}</span>
                        </p>
                    </article>
                    <span className="absolute top-3 right-3 text-xs text-light-text">{ele.sentTime}</span>
                </article>
                ))
            }
    
        </div>
    </>
    )
}