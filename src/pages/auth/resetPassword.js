import { useState } from "react"
import Input from "../../components/input";
import { Link } from "react-router-dom";

function ResetPassword({setActivePage}){
    const [password,setpassword] = useState({});

    function handleSubmit(){

    }

    return(
        <section className="reset-wrapper flex items-center w-1/2">
                <form onSubmit={(e)=>handleSubmit(e)} className="w-full h-full flex flex-col justify-between items-center p-4 md:px-8 gap-2 rounded-l-md">
                    <h1 className="text-3xl mb-3 text-green-600 font-bold">ResetPassword</h1>
                    <Input color="green" label="Password" type="email" id="password-cnfrm"></Input>
                    <Input color="green" label="Confirm Password" type="password" id="password-cnfrm"></Input>
                    <div className="buttons-wrapper flex flex-col">
                        <div className="flex gap-[10px]">
                            <button className="bg-green-600 border-secondary border-[1px] p-2 px-4 rounded-md">Submit</button>
                            <button className="bg-green-600 border-secondary border-[1px] p-2 px-4 rounded-md" type="button">
                                <Link to={'/login'}>
                                    Back to login
                                </Link>                        
                            </button>
                        </div>
                    </div>
                </form>
        </section>
    )
}

export default ResetPassword;