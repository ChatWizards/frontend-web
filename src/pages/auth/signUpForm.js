import { useState } from "react"
import useFetch from "../../hooks/useFetch"
import {Input} from "../../ui"
import { BarLoader } from "react-spinners"
import { Link } from "react-router-dom"

const SignupForm = (props)=>{
    const [signupDetails,setSignupDetails] = useState([])

    const [data,loading,error] = useFetch({
        url:"/user/signup",
        method:"post",
        postData:signupDetails
    },[signupDetails])

    const handleSubmit = (e)=>{
        e.preventDefault();
        console.log(signupDetails)
    }

    return(
        <form onSubmit={(e)=>handleSubmit(e)} className="w-full h-full flex flex-col justify-between items-center p-4 md:px-8 gap-2 rounded-l-md">
            <h1 className="text-3xl mb-3 text-green-600 font-bold">Signup - User Onboard</h1>
            <div className="flex flex-col gap-4 items-center">
                <div className="flex gap-4">
                    <Input name="fname" style={{width:"90px"}} type="text" label="Fname" id="fname" spacing="mt-3"/>
                    <Input name="lname"  style={{width:"90px"}}  type="text" label="Lname" id="lname" spacing="mt-3"/>    
                </div>
                <Input name="email" type="email" label="Email" color="green" id="email-signup" spacing="mt-3" required={true}/>
                <Input name="profilePic" id="profilePic" type="file"></Input>
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
                    <button className="text-xs p-0 bg-transparent mt-2" type="button">Already a user?<span to={"/login"} className="underline text-green-500 hover:text-white duration-200 ps-1" onClick={()=>{props.setActivePage(0)}}>Login</span></button>
                </div>
            </div>
        </form>
    )
}

export default SignupForm