import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ToastContext } from "../contexts";

const apiInstance = axios.create({
    baseURL:process.env.REACT_APP_BACKEND_URL,
})


function useFetch({url,method,postData,config={}},dependencies=[],callback){
    if(config.user&&config.user.token!="") apiInstance.defaults.headers.common['Authorization'] = `Bearer ${config.user.token}`;
    const { setToastMsg } = useContext(ToastContext);
    const [data,setData] = useState(null)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)

    useEffect(()=>{
        let isMounted = true;
        if (isMounted && dependencies.every(dep => dep !== null && dep !== undefined && Object.keys(dep).length !== 0 && dep.token !== '')){
            console.log("called")
            async function fetchData(){
                let res;
                setLoading(true)
                try{
                    if(method==="post"){
                        res = await apiInstance.post(url,postData)
                    }
                    else if(method==="get"){
                        res = await apiInstance.get(url)
                    }
                    const {data} = res
                    setData(data)
                    if(callback && typeof callback == "function"){
                        console.log(data)
                        callback(data,error,loading)
                    }
                }catch(err){     
                    if(err.code=="ERR_NETWORK"){
                        setToastMsg({type:"error",message:"could not locate the server"})
                        return 
                    }           
                    if(err.response){
                        const {data} = err.response
                        console.log(data) 
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