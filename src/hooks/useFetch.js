import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContext } from "../contexts";

const apiInstance = axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URL,
})

function useFetch({url,method,postData,dependencies=[],config={}}){
    if(config.user) apiInstance.defaults.headers.common['Authorization'] = `Bearer ${config.user.token}`;
    const { setToastMsg } = useContext(ToastContext);
    
    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)


    useEffect(()=>{
        console.log("called")
        let isMounted = true;
        if(!navigator.onLine){
            setError({type:"error",message:"No internet Connection"})
            return
        }
        if (isMounted && dependencies.every(dep => dep !== null && dep !== undefined &&dep !=={})){
            async function fetchData(){
                let res;
                setLoading(true)
                try{
                    if(method==="post"){
                        res = await apiInstance.post(url,postData)
                        console.log(postData)
                    }
                    else if(method==="get"){
                        res = await apiInstance.get(url)
                        console.log(res)
                    }
                    const {data} = res
                    console.log(data)
                    setData(data)
                    
                }catch(err){
                    console.log(err.response)
                    if(err.response){
                        const {data} = err.response
                        setError({type:"error",message:data.message})
                        setToastMsg({type:"error",message:data.message})
                    }
                    else setError({type:"error",message:"No internet Connection"})
                }
                setLoading(false)
            }    
            fetchData()
        }
    },[...dependencies])
    return [data,error,loading]
}

export default useFetch

export {apiInstance}