import { useParams,Link } from "react-router-dom"
import {Input} from '../../ui'
import { MoonLoader, BarLoader } from "react-spinners"
import { FaRegEye,FaRegEyeSlash } from "react-icons/fa"
import useFetch from "../../hooks/useFetch"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { ToastContext } from "../../contexts"

const VerifyForm = (props)=>{
    const params = useParams()
    const [showPassword,setShowPassword] = useState(false)
    const [userData,setUserData] = useState()
    const navigate = useNavigate()
    const {setToastMsg} = useContext(ToastContext)

    const tokenData = useFetch({
        url:`/user/verifyToken/${params.token}`,
        method:"get",
    },[params.token])

    const [,loading,] = useFetch({
        url:`/user/verify`,
        postData:userData,
        method:"post",
        callback:(error)=>{
            if(error) handleTokenError(error)
        }
    },[userData])

    function handleTokenError(error){
        if(error&&[400,403,401].includes(error.status)){
            setToastMsg({type:"error",message:error.message})
            navigate('/auth/signup')
            // const id = setTimeout(()=>{
            //     navigate('/auth/signup')
            // },0)
        }
    //    return clearTimeout(id)
    }

    function handleVerifySuccess(data){
        console.log("inside");
        console.log(data)
        if(data.status===200){
            navigate("/auth/login")
        }
    }

    const backToLogin = ()=>{
        navigate('/auth/login')
        props.setActivePage(0)        
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const {userName,email,password,confirmPassword} = e.target
        if(password.value!==confirmPassword.value){
            setToastMsg({type:"error",message:"Passwords do not match"})
            return
        } 
        setUserData((prev)=>(
            {
                userName:userName.value,
                password:password.value,
                email:email.value,
            }))
        console.log("submitted")
    }

    return(
        <form onSubmit={(e)=>handleSubmit(e)} className="w-full h-full flex flex-col justify-between items-center p-4 md:px-8 gap-2 rounded-l-md">
            <div className="flex flex-col gap-4 items-center">
                <h1 className="text-3xl mb-3 text-green-600 font-bold">Signup - User Credentials</h1>
                {tokenData.loading&&<MoonLoader className="text-primary" loading={tokenData.loading}/>}
                {!tokenData.loading&&(
                    <>
                        <article className="flex relative items-end">
                            <Input name="userName" type="text" label="user name" id="userName" spacing="mt-3"  required={true}/>
                            <span className="inline-block w-8"></span>
                        </article>
                        <article className="flex relative items-end">
                            <Input name="password" type={showPassword?"text":"password"} label="Password" color="green" id="password-signup" spacing="mt-3"  required={true}/>
                            <button onClick={()=>{setShowPassword(prev=>!prev)}} className="bg-dark text-white border-2 shadow-md p-2 border-primary hover:bg-secondary hover:text-primary duration-300 rounded-md">
                                {showPassword&&<FaRegEye size={10}/>}
                                {!showPassword&&<FaRegEyeSlash size={10}/>}
                            </button>
                        </article>
                        <article className="flex relative items-end">
                            <Input name="confirmPassword" type={showPassword?"text":"password"} label="Confirm Password" color="green" id="password-cnfrm-signup"spacing="mt-3" required={true} ></Input>
                            <span className="w-8 inline-block"></span>
                        </article>
                    </>
                )}
            </div>
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
                    <button className="text-xs p-0 bg-transparent mt-2" type="button">Already a user?<span to={"/login"} className="underline text-green-500 hover:text-white duration-200 ps-1" onClick={backToLogin}>Login</span></button>
                </div>
            </div>
        </form>
    )
}

export default VerifyForm