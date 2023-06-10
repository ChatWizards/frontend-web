import { useState,forwardRef } from "react"

const Chatbar = forwardRef((props,ref)=>{
    return(
        <div className="chatbar-wrapper w-full relative">
        <textarea ref={ref} type="text" className="chatbar bg-secondary active:outline-none rounded-2xl px-4 py-2 pe-10 shadow-lg w-full text-white " rows={1} placeholder="📎Message"/>
        <button onClick={props.sendMessage} type="button" className="send-button text-white absolute right-0 top-[calc(50%-3px)] -translate-y-1/2 w-[40px] h-[37px] bg-primary rounded-2xl px-3">
            <img src="/icons/send.svg" alt="send"/>
        </button>
        </div>
    )
})


export default Chatbar;