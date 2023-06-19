import { useState } from "react"
import Input from "../../components/input";
import { Link } from "react-router-dom";

function ForgotPassword({setActivePage}){
    const [forgotDetails,setforgotDetails] = useState({});

    function handleSubmit(){

    }

    return(
        <section className="forgot-wrapper flex items-center w-1/2">
                <form onSubmit={(e)=>handleSubmit(e)} className="w-full h-full flex flex-col justify-between items-center p-4 md:px-8 gap-2 rounded-l-md">
                    <h1 className="text-3xl mb-3 text-green-600 font-bold">Forgot Password</h1>
                    <Input color="green" label="Email" type="email" id="email-login"></Input>
                    <div className="buttons-wrapper flex flex-col">
                        <div className="flex gap-[10px]">
                            <button className="bg-green-600 border-[1px] border-secondary p-2 px-4 rounded-md">Submit</button>
                            <button className="bg-green-600 border-[1px] border-secondary p-2 px-4 rounded-md" type="button">
                                <Link to={'/auth'}>
                                    Back to login
                                </Link>                        
                            </button>
                        </div>
                    </div>
                </form>
        </section>
    )
}

export default ForgotPassword;