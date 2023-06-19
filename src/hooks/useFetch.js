import { useEffect, useState } from "react";
import axios from "axios";

const apiInstance = axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URL,
})

function useFetch(url,method,postData,config,callback,dependencies){
    const [data,setData] = useState({})
    const [error,setError] = useState({})
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        setLoading(true)
        if(method==="post")
        apiInstance.post(url,{data:{...postData},config:{config}})
                .then((res)=>{
                    console.log(res)
                    setData(res)
                    setLoading(false)
                })
                .catch(err=>{
                    console.log(err);
                    setError(err)
                    setLoading(false)
                    if(callback) callback()
                })
        if(method=="get")
        apiInstance.get(url,{config})
                .then((res)=>{                    
                    setData(res)
                    setLoading(false)
                })
                .catch(err=>{console.log(err);
                    setError(err)
                    setLoading(false)
                    if(callback) callback()
                })
    },[...dependencies])
    return [data,error,loading]
}

export default useFetch

export {apiInstance}