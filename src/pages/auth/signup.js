import { createRef, useContext, useEffect, useState } from "react"
import Input from "../../ui/input";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { ToastContext } from "../../contexts";
import { useLocation } from "react-router-dom";
import {BarLoader, MoonLoader} from 'react-spinners'
import { IoMdEye } from "react-icons/io";
import { RiEyeFill } from "react-icons/ri";
import { FaEye, FaRegEye } from "react-icons/fa";



function Signup({setActivePage}){
    const {setToastMsg} = useContext(ToastContext)
    const [verify,setVerify] = useState()
    const location = useLocation();
    const navigate = useNavigate();
    const [token,setToken] = useState("")
    const [signupDetails,setSignupDetails] = useState();
    const [showPassword,setShowPassword] = useState(false)

    const [data,,loading] = useFetch({
        url:`/user/${verify?"verify":"signup"}`,
        method:"post",
        postData:verify?signupDetails:signupDetails&&signupDetails.formData,
        callback:verify?(data)=>{
            console.log("inside callback");
            handleVerifySuccess(data)
        }:null
    },[signupDetails,verify])

    const [tokenData,tokenError,tokenLoading] = [false,false,false]

    useEffect(()=>{
        if(tokenError&&[401,400,403].includes(tokenError.status)){
            setToastMsg({type:"error",message:tokenError.message})
            navigate("/auth/signup")
        }
    },[tokenError])

    useEffect(()=>{
        if(verify===true && data && (data.status===200 ||data.status===201)) setActivePage(1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[data])

    useEffect(()=>{
        console.log(loading);
    },[loading])

    function handleVerifySuccess(data){
        console.log("inside");
        console.log(data)
        if(data.status===200){
            setToken('')
            setVerify(false)
            navigate("/auth/login")
        }
    }

    function handleSubmit(e){
        e.preventDefault()
        if(verify){
            const password = e.target.password  
            const confirmPassword = e.target.confirmPassword    
            const userName = e.target.userName
            if(password.value !== confirmPassword.value){
                setToastMsg({type:"error",message:"please check the passwords"})
                return
            }
            setSignupDetails({
                password:password.value,
                confirmPassword:confirmPassword.value,
                userName:userName.value,
                token:token
            })
        }
        else{
            const {email,fname,lname,profilePic} = e.target
            const formData = new FormData()
            if(profilePic.files.length){
                if(!profilePic.files[0].type.includes('image')){
                    setToastMsg({type:"error",message:"profile pic must be image"})
                    return
                }
                formData.append('profilePic',profilePic.files[0])
            }
            formData.append('fname',fname.value)
            formData.append('lname',lname.value)
            formData.append('email',email.value)
            setSignupDetails({formData:formData})
        }
    }

    useEffect(()=>{
        if(location.search){
            const searchParams = new URLSearchParams(location.search)
            setToken(searchParams.get("token"))
            setActivePage(1)
        }
    },[])

    useEffect(()=>{
        if(token) setVerify(true)
    },[token])

    useEffect(()=>{
        if(data){
            setToastMsg({type:"success",message:data.message})
            setActivePage(1)
        }
    },[data])


    return(
        <section className="signup-wrapper flex items-center w-full">
                <form onSubmit={(e)=>handleSubmit(e)} className="w-full h-full flex flex-col justify-between items-center p-4 md:px-8 gap-2 rounded-l-md">
                    <h1 className="text-3xl mb-3 text-green-600 font-bold">Signup</h1>
                    {!verify&&(
                    <div className="flex flex-col gap-4 items-center">
                        <div className="flex gap-4">
                            <Input name="fname" style={{width:"90px"}} type="text" label="Fname" id="fname" spacing="mt-3"/>
                            <Input name="lname"  style={{width:"90px"}}  type="text" label="Lname" id="lname" spacing="mt-3"/>    
                        </div>
                        <Input name="email" type="email" label="Email" color="green" id="email-signup" spacing="mt-3" required={true}/>
                        <Input name="profilePic" id="profilePic" type="file"></Input>
                    </div>
                    )}
                    {verify&&(
                    <div className="flex flex-col gap-4 items-center">
                        {tokenLoading&&<MoonLoader className="text-primary" loading={tokenLoading}/>}
                        {!tokenLoading&&(
                            <>
                                <article className="flex relative items-end">
                                    <Input name="userName" type="text" label="user name" id="userName" spacing="mt-3"  required={true}/>
                                    <span className="inline-block w-8"></span>
                                </article>
                                <article className="flex relative items-end">
                                    <Input name="password" type={showPassword?"text":"password"} label="Password" color="green" id="password-signup" spacing="mt-3"  required={true}/>
                                    <button type="button" onClick={()=>{setShowPassword(prev=>!prev)}} className="bg-dark text-white border-2 shadow-md p-2 border-primary hover:bg-secondary hover:text-primary duration-300 rounded-md">
                                        <FaRegEye size={10}/>
                                    </button>
                                </article>
                                <article className="flex relative items-end">
                                    <Input name="confirmPassword" type={showPassword?"text":"password"}  label="Confirm Password" color="green" id="password-cnfrm-signup"spacing="mt-3" required={true} ></Input>
                                    <span className="w-8 inline-block"></span>
                                </article>
                            </>
                        )}
                    </div>
                    )}    

                    <div className="buttons-wrapper flex flex-col mt-4">
                        <div className="flex gap-[10px]">
                            <button className={`bg-green-600 relative border-[1px] border-black p-2 px-4 rounded-md ${loading?'opacity-50 cursor-not-allowed':'hover:bg-dark hover:text-primary hover:border-primary duration-300'}`}>
                            {loading&&(
                                    <div className="absolute flex justify-center left-1/2 bottom-1 -translate-x-1/2">
                                        <BarLoader width={50} color="#f6d7b7" loading={loading} height={2}/>
                                    </div>
                                )}
                                Signup
                            </button>
                            <button className="bg-green-600 border-[1px] border-black p-2 px-4 rounded-md hover:bg-dark hover:text-primary hover:border-primary duration-300" type="button">
                                <Link to={'/forgot'}>
                                    Forgot Password
                                </Link>                        
                            </button>
                        </div>
                        <div className="flex items-center m-auto">
                            <button className="text-xs p-0 bg-transparent mt-2" type="button">Already a user?<span to={"/login"} className="underline text-green-500 hover:text-white duration-200 ps-1" onClick={()=>{setActivePage(0)}}>Login</span></button>
                        </div>
                    </div>
                </form>
        </section>
    )
}

export default Signup;