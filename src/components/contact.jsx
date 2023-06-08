export default function Contact(props){
        return(
        <article className={`rounded-lg p-2 w-[300px] h-[75px] ${props.active?"bg-gray-200":""}`}>
            <div className="flex h-full gap-2">
                <div className="img-wrapper relative flex-shrink-0 h-full rounded-2xl p-2  bg-red-300 aspect-[1/1]">
                <img src="logo192.png" alt="img" className="h-full w-full object-contain"/>
                <span className={`absolute -top-0.5 -left-0.5 w-[12.5px] h-[12.5px] rounded-full ${props.isActive?"bg-green-400":"hidden"}`}></span>
                </div>
                <div>
                    <h1 className="font-semibold">
                        {props.userName}
                        <span className="float-right font-thin text-xs text-green-950">{props.activeTime}</span>
                    </h1>
                    <p className=" text-xs text-justify text-slate-400">{props.lastText.length>81?props.lastText.substring(0,77)+" ...":props.lastText}</p>
                </div>
            </div>
        </article>
    )
}