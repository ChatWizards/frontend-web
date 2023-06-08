const MessagePrimary = (props)=>{
    const type = props.type||"primary"
    return(
    <div className={`messgae-wrapper w-full`}>
        <div className={`message border-0 float p-2 flex items-center ${type=="primary"?"":"flex-row-reverse"}`}>
            <img src="logo192.png" alt="" className={`${type=="primary"?"bg-gray-600":"bg-slate-400"} rounded-full w-[30px] h-[30px] border-2 border-green-200`} />
            <p className={`message-text text-justify px-5 py-3 ${type=="primary"?"primary bg-blue-500":"secondary bg-ametyst"} mx-4 rounded-md shadow-md before:absolute relative max-w-[300px] text-cream`}>{props.text}</p>
        </div>      
      </div>
    )
}


export {MessagePrimary}