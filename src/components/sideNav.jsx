import { useState } from "react";
import { Tooltip } from 'react-tooltip'

function SideNav(){
    const [chatType,setChatType] = useState("user")
    return(
        <section className="sideNav fixed flex pb-3 z-50 flex-col top-0 l-0 bg-secondary h-screen justify-between">
            <div className="chat-sort-icons relative p-2">
                <span className="logo mb-3 absolute top-0 left-1/2 -translate-x-1/2 p-2 bg-primary border-dark rounded-sm w-full flex justify-center border-b-2">
                    <img src="/icons/logo.svg" alt="logo" />
                </span>
                <ul className="flex flex-col gap-2 pt-16">
                        <li data-tooltip-id="user_chat" data-tooltip-content="view users" data-tooltip-place="left" className={`p-1 rounded-full text-lg ${chatType=="user"?"bg-primary":"bg-secondary hover:bg-opacity-10 duration-200 hover:bg-white"} shadow-xl shadow-dark border-[1px] border-primary`} aria-roledescription="chats" onClick={()=>setChatType("user")}>
                            <img src="/icons/user_chat.svg" className="m-auto" width={20} height={20} alt="" />
                            <Tooltip id="user_chat"/>
                        </li>

                        <li data-tooltip-id="group_chat" data-tooltip-content="View groups" data-tooltip-place="left" className={`p-1 rounded-full text-lg ${chatType=="group"?"bg-primary":"bg-secondary hover:bg-opacity-10 duration-200 hover:bg-white"} shadow-xl shadow-dark border-[1px] border-primary`} aria-roledescription="groups" onClick={()=>setChatType("group")}>
                            <Tooltip id="group_chat"/>
                            <img src="/icons/group_chat.svg" className="m-auto" width={20} height={20} />
                        </li>
                </ul>
            </div>
            <div className="chat-icons p-2">
            <ul className="flex flex-col gap-2 pt-16">
                    <li data-tooltip-id="add_chat" data-tooltip-content="add group or indivisual chat" data-tooltip-place="left" className={`p-1 rounded-full text-lg bg-white py-2 hover:bg-opacity-10 duration-200 hover:bg-white shadow-xl shadow-dark`} aria-roledescription="chats" onClick={()=>setChatType("user")}>
                        <img src="/icons/new_chat.svg" className="m-auto" width={20} height={20} alt="" />
                        <Tooltip id="add_chat"/>
                    </li>
            </ul>
            </div>
            <div className="profile-icons p-2">
                <ul className="flex flex-col gap-2">
                    <li data-tooltip-id="settings" data-tooltip-content="settings" data-tooltip-place="left" className="p-1 rounded-full text-lg bg-dark" aria-roledescription="settings">
                        <img src="/icons/setting.svg" className="m-auto" alt="setting" width={20} height={20}/>
                        <Tooltip id="settings"/>

                    </li>
                    <li data-tooltip-id="profile" data-tooltip-content="view profile" data-tooltip-place="left" className="p-1 rounded-full text-lg bg-dark" aria-roledescription="profile-info">
                        <img src="/icons/profile.svg" className="m-auto" width={20} height={20} alt="" />
                        <Tooltip id="profile"/>

                    </li>
                </ul>
            </div>
        </section>
    )
}

export default SideNav;