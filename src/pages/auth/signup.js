import { useContext, useEffect, useState } from "react"
import Input from "../../components/input";
import { Link, useNavigate } from "react-router-dom";
import {apiInstance} from "../../hooks/useFetch";
import { ToastContext } from "../../contexts";
import { useLocation } from "react-router-dom";



function Signup({setActivePage}){
    const {setToastMsg} = useContext(ToastContext)
    const [verify,setVerify] = useState(false)
    const location = useLocation();
    const [signupDetails,setSignupDetails] = useState({
        email:"",password:""
    });

    function handleSubmit(e){
        e.preventDefault()
        if(verify){
            const password = e.target.password  
            const confirmPassword = e.target.confirmPassword    
            const userName = e.target.userName
            if(password.value != confirmPassword.value){
                console.log(password,confirmPassword)
                setToastMsg({type:"error",message:"please check the passwords"})
                return
            }
            setSignupDetails({
                password:password.value,
                confirmPassword:confirmPassword.value,
                userName:userName.value
            })
        }
        else{
            const {email,fname,lname,profilePic} = e.target
            console.log(fname)
            setSignupDetails({
                email:email.value,
                fname:fname.value,
                lname:lname.value,
                profilePic:"https://cdn.dribbble.com/users/795890/screenshots/15187819/bauhaus_pattern_4x.png"
            })
        }
        }

    useEffect(()=>{
        if(location.search){
            const searchParams = new URLSearchParams(location.search)
            const token = searchParams.get("token")
            if(token) setVerify(true)
            setActivePage(1)
        }
        console.log(verify)
    },[])

    useEffect(()=>{
        console.log(signupDetails)
        if(signupDetails.email || signupDetails.userName){
            const searchParams = new URLSearchParams(location.search)
            const token = searchParams.get("token")
            
            apiInstance.post(`/user/${verify==true?"verify":"signup"}`,{...signupDetails,token})
            .then((res)=>{
                console.log(res)
                const {data} = res 
                setToastMsg({type:"success",message:data.message})
                setActivePage(1)
            })
            .catch(err=>{
                const {data} = err.response
                setToastMsg({type:"error",message:data.message})
                if(data.status==409) {
                    setSignupDetails({})
                    setActivePage(0)
                }
            })
        }
    },[signupDetails])


    return(
        <section className="signup-wrapper flex items-center w-1/2">
                <form onSubmit={(e)=>handleSubmit(e)} className="flex w-full h-full flex-col justify-between items-center p-4 gap-2 rounded-r-md">
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
                        <Input name="userName" type="text" label="user name" id="userName" spacing="mt-3"  required={true}/>
                        <Input name="password" type="password" label="Password" color="green" id="password-signup" spacing="mt-3"  required={true}/>
                        <Input name="confirmPassword" type="password" label="Confirm Password" color="green" id="password-cnfrm-signup"spacing="mt-3" required={true} ></Input>
                    </div>
                    )}    

                    <div className="buttons-wrapper flex flex-col mt-4">
                        <div className="flex gap-[10px]">
                            <button className="bg-green-600 border-[1px] border-black p-2 px-4 rounded-md hover:bg-dark hover:text-primary hover:border-primary duration-300">Signup</button>
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