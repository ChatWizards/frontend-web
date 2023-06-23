import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../contexts/userContext";
import Input from "../../components/input";
import { Link, useNavigate } from "react-router-dom";
import {MoonLoader,BarLoader} from 'react-spinners'
import useFetch, {apiInstance} from "../../hooks/useFetch";
import { ToastContext } from "../../contexts";

function Login({setActivePage}){
    const {setToastMsg} = useContext(ToastContext)
    const {setUser} = useContext(UserContext)
    const navigate = useNavigate();

    const [loginDetails,setLoginDetails] = useState();



    function handleSubmit(e){
        e.preventDefault();
        const {email,password} = e.target
        setLoginDetails((prev)=>(
            {email:email.value,password:password.value}
        ))
    }

    // useEffect(()=>{
    //     if(loginDetails.email){
    //         apiInstance.post('/user/login',{...loginDetails})
    //         .then((res)=>{
    //             const {response} = res.data 
    //             setUser({userName:response.userName,email:response.email,token:response.token,profilePic:response.profilePic})
    //             setToastMsg({type:"success",message:response.message})
    //             navigate('/')
    //         })
    //         .catch(err=>{
    //             console.log(err)
    //             const {data} = err.response
    //             setToastMsg({type:"error",message:data.message})
    //         })
    //     }
    // },[loginDetails])

    const [data,error,loading] = useFetch('/user/login','post',loginDetails,[loginDetails])

    useEffect(()=>{
        if(data) {
            setUser(data.response)
            navigate('/')
        }
    },[data])

    return(
        <section className="login-wrapper flex items-center w-1/2">
                <form onSubmit={(e)=>handleSubmit(e)} className="w-full h-full flex flex-col justify-between items-center p-4 md:px-8 gap-2 rounded-l-md">
                    <h1 className="text-3xl mb-3 text-green-600 font-bold">Login</h1>
                    <Input label="Email" required={true} name="email" type="email" id="email-login"></Input>
                    <Input label="Password" required={true} name="password" type="password" id="email-password"></Input>
                    <div className="buttons-wrapper flex flex-col">
                        <div className="flex gap-[10px]">
                            <button className={`bg-green-600 relative border-[1px] border-black p-2 px-4 rounded-md duration-300 ${loading?'opacity-50 cursor-not-allowed':'hover:bg-dark hover:text-primary hover:border-primary'}`}>
                                {loading&&(
                                    <div className="absolute flex justify-center left-1/2 bottom-1 -translate-x-1/2">
                                        <BarLoader width={50} color="#f6d7b7" loading={loading} height={2}/>
                                    </div>
                                )}
                                Login
                            </button>
                            <button className="bg-green-600 border-[1px] border-black p-2 px-4 rounded-md hover:bg-dark hover:text-primary hover:border-primary duration-300" type="button">
                                <Link to={'/forgot'}>
                                    Forgot Password
                                </Link>                        
                            </button>
                        </div>
                        <div className="flex items-center m-auto">
                            <button className="text-xs p-0 bg-transparent mt-2" type="button">Not a user?<span className="underline text-green-500 hover:text-white duration-200 ps-1" onClick={()=>{setActivePage(1)}}>signup</span></button>
                        </div>
                    </div>
                </form>
        </section>
    )
}

export default Login;