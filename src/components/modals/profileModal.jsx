import {useContext} from 'react'
import {ToastContext, UserContext} from '../../contexts'
import { ButtonPrimary } from '../button'

function ProfileModal(){
    const {user,setUser} = useContext(UserContext)
    const {setToastMsg} = useContext(ToastContext)

    function logOut(){
        sessionStorage.removeItem("user")
        setUser({})
        setToastMsg({type:"success",message:"User Logged out successfully"})
    }

    return(
        <>
        <div className="flex flex-col border-b-2 border-dark pb-3">
            <img src={user.profilePic} alt="ProfilePic" width={50} height={50} className="m-auto my-3 rounded-full border-2 border-primary"/>
            <article class="flex justify-evenly items-center">
            <div className="flex flex-col">
            
            <span className="text-lg text-primary w-100 block">
                <span className="text-white text-xs pe-[2px] uppercase font-mono">UserName:</span>
                {user.userName}
            </span>
            <p className="space-x-5">
            <span className="text-lg text-primary text-center">
                <span className="text-white text-xs pe-[2px] uppercase font-mono">FName:</span>
                {user.fname||"user"}
            </span>
            <span className="text-lg text-primary">
                <span className="text-white text-xs pe-[2px] uppercase font-mono">lName:</span>
                {user.lname||"user"}
            </span>
            </p>
            <span className="text-lg text-primary">
                <span className="text-white text-xs pe-[2px] uppercase font-mono">Email:</span>
                {user.email}
            </span>

            </div>
            </article>
            <div className='flex mt-3 items-center m-auto'>
                <ButtonPrimary onClick={logOut}>Log Out</ButtonPrimary>
            </div>
        </div>
        <div className="flex flex-col">
            <h1 className="text-xl text-white font-bold ps-3 py-2 font-mono uppercase">Groups</h1>
            <></>
        </div>
        </>
    )
}

export default ProfileModal