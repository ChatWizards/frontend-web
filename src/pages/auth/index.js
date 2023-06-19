import Login from './login'
import Signup from './signup'
import './index.css'
import { useEffect, useState } from 'react'
import ForgotPassword from './forgotPassword'
import ResetPassword from './resetPassword'

function Auth(){
    const [activePage,setActivePage] = useState(0)

    return(
        <section className='flex items-center justify-center w-screen h-screen'>
        <div className={`Auth-wrapper container flex justify-between rounded-md relative border-2 border-secondary  m-auto py-5 bg-secondary g-[40px] max-w-[800px]`}>
            <div className={`illustration absolute left-0 bottom-1/2 z-50 border-2 space-y-3 border-primary translate-y-[calc(50%-.5px)] duration-300 w-[calc(50%-40px)] h-full ${activePage==0?"bg-dark translate-x-[calc(100%+80px)] rounded-r-md":"bg-dark rounded-l-md"}`}>
                <h1 className='text-3xl font-semibold text-center text-primary pt-10'>Wizard Chat</h1>
                {activePage==1?
                <img src={"/signup.jpg"} className='w-1/2 h-auto m-auto'/>
                :
                <img src={"/login.jpg"} className='w-3/4 h-auto m-auto'/>
                }                
            </div>
            <Login setActivePage={setActivePage}></Login>
            <Signup setActivePage={setActivePage}></Signup>
        </div>
        </section>
    )
}

function Reset(){
    const [activePage,setActivePage] = useState(1)

    useEffect(()=>{
        console.log(activePage)
    },[activePage])


    return(
        <section className='flex items-center justify-center w-screen h-screen'>
        <div className={`Auth-wrapper container flex justify-between rounded-md relative border-2 border-secondary  m-auto py-5 bg-secondary g-[40px] max-w-[800px]`}>
            <div className={`illustration absolute left-0 bottom-1/2 z-50 border-2 border-primary translate-y-[calc(50%-.5px)] duration-300 w-[calc(50%-40px)] h-full ${activePage==0?"bg-dark translate-x-[calc(100%+80px)] rounded-r-md":"bg-dark rounded-l-md"}`}>
                <h1 className='text-3xl font-semibold text-center text-primary pt-3'>Wizard Chat</h1>
                {activePage==1?
                <img src={"/signup.jpg"} className='w-1/2 h-[calc(100%-50px)] m-auto'/>
                :
                <img src={"/login.jpg"} className='w-1/2 h-[calc(100%-50px)] m-auto'/>
                }                
            </div>
            <ForgotPassword setActivePage={setActivePage}></ForgotPassword>
            <ResetPassword setActivePage={setActivePage}></ResetPassword>
        </div>
        </section>
    )
}


export {Auth,Reset}