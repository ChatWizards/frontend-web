import SearchBar from "../search";
import { useContext, useEffect, useState } from "react";
import Input from '../input'
import {ButtonAmetyst} from '../button'
import axios from "axios";
import useFetch, { apiInstance } from "../../hooks/useFetch";
import {BounceLoader} from 'react-spinners'
import { UserContext } from "../../contexts";

export default function InviteModal(){
    const {user} = useContext(UserContext)
    const [invites,setInvites] = useState([
    ])
    const [userDetail,setUserDetail] = useState()

    function handleSubmit(e){
        e.preventDefault()
        const {contact} = e.target
        if(contact.value) setUserDetail(contact.value)
    }

    const [getData,error,loading] = useFetch({url:'/user/invite',method:'get',config:{user}})

    useEffect(()=>{
        if(getData){
            console.log(getData)
            setInvites(getData.response)
        }
    },[getData])

    useEffect(()=>{
        if(userDetail){
            async function fetchData(){
                try{
                    const {data} = await axios.post("http://localhost:4000/user/invite",{contact:userDetail},{headers:{'Authorization':`Bearer ${user.token}`}})
                    console.log(data)
                    setInvites((prev)=>([...prev,data.response]))
                }
                catch(err){
                    console.log(err)
                }
            }
            fetchData()    
        }
    },[userDetail])

    useEffect(()=>{
        console.log(invites)
    },[invites])

    return(
        <>
        <div className="px-4 py-2 bg-dark" id="send-invite">
            <SearchBar></SearchBar>
        </div>    
        <h1 className="font-mono text-white pt-3 ps-3 mx-2 border-b-2">Invites</h1>
        <div className="space-y-2 overflow-y-scroll pt-3 h-[300px] px-1 mx-1" id="invites">
            {
                loading?<BounceLoader></BounceLoader>:
                invites.map((ele)=>(
                    <article className="invite w-full h-16 flex gap-2 relative rounded-sm border-[1px] border-primary">
                    <div className="flex items-center w-fit h-full ps-2">
                        <img src={ele.receiver.profilePic} className="rounded-full bg-primary" alt="img" height={50} width={50}/>
                    </div>
                    <article className="flex items-center">
                        <p className="invitation-header flex flex-col relative">
                            <span className="text-lg text-primary">{ele.receiver.userName}</span>
                            <span className="text-sm text-white ps-2">{ele.inviteStatus}</span>
                        </p>
                    </article>
                    <span className="absolute top-3 right-3 text-xs text-light-text">{ele.timeStamp}</span>
                </article>
                ))
            }
        </div>
        <h1 className="font-mono text-white pt-3 ps-3 mx-2 border-b-2">Send Invite</h1>
        <div className="">
            <form className="pt-5 flex flex-col gap-2 m-auto items-center justify-center" onSubmit={handleSubmit}>
                <Input name="contact" label="Username or email" required={true}></Input>
                <ButtonAmetyst>Send</ButtonAmetyst>
            </form>
        </div>
    </>
    )
}