import { useEffect, useState } from "react"

function Toast({type,message}){
    const [active,setActive] = useState(false)
    useEffect(()=>{
        if(active){
            return ()=>setTimeout(()=>setActive(false),3000)
        }
    },[active])
    return(
        <section className={`${active?"translate-y-[20px]":"translate-y-[0px]"} duration-300 toast-wrapper rounded absolute top-[-20px] left-1/2 translate-x-1/2`}>
            <div className={`${type=="success"||type=="info"?"bg-primary text-primary":"bg-secondary","text-red-600"}`}>{message}</div>
        </section>
    )
}