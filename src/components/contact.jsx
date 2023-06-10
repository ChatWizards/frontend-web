export default function Contact(props){
        return(
        <article className={`rounded-lg p-2 w-full relative max-w-[300px] h-[75px] ${props.active?"bg-primary":"bg-inherit"}`}>
            <div className="flex h-full gap-2">
                <div className="img-wrapper relative flex-shrink-0 h-full rounded-2xl p-2  bg-red-300 aspect-[1/1]">
                <img src={props.img} alt="img" className="h-full w-full object-contain"/>
                <span className={`absolute -top-0.5 -left-0.5 w-[12.5px] h-[12.5px] rounded-full ${props.isActive==true?"bg-green-400":"hidden"}`}></span>
                </div>
                <div>
                    <h1 className={`font-semibold ${props.active?"text-secondary":"text-white"}`}>
                        {props.userName}
                        <span className={`absolute right-2 font-thin text-[10px] ${props.active?"text-dark":"text-white"}`}>{props.isActive==true?"Now":props.activeTime}</span>
                    </h1>
                    <p className={`text-xs text-justify text-light-text ${props.active?"text-white":"text-light-text"}`}>{props.lastText&&props.lastText.length>81?props.lastText.substring(0,77)+" ...":props.lastText}</p>
                </div>
            </div>
        </article>
    )
}