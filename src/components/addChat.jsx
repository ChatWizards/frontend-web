import { apiInstance } from "../hooks/useFetch"
import { Button, ButtonAmetyst, ButtonPrimary } from "./button"
import Input from "./input"
import { useContext } from "react"
import { ToastContext, UserContext } from "../contexts"
function CreateChat({setAddChat,sendInvite}){
    const {setToastMsg} = useContext(ToastContext)
    const {user} = useContext(UserContext)

    function sendInvite(contact){
        apiInstance.post('/chat/create',{users:[contact]},{headers:{'Authorization': 'Bearer ' + user.token}})
            .then((res)=>{
                console.log(res)
                const {data} = res
                setToastMsg({type:"success",message:data.message})
            })
            .catch(err=>{
               console.log(err)
               const {data} = err.response
               setToastMsg({type:"error",message:data.message})
            })
        
    }   

    function handleSubmit(e){
        e.preventDefault()   
        const {contact} = e.target
        sendInvite(contact.value)
    }

    return(
        <section className="bg-primary rounded-md p-2 absolute top-1/2 -translate-y-1/2 left-10 z-50">
            <div className="w-[250px]">
            <h1 className="">Add Chat</h1> 
            <form onSubmit={handleSubmit}>
            <Input name="contact" placeholder="Enter email or username" required="true"></Input> 
                <div className="inline-block m-auto space-x-3 pt-3">
                    <ButtonAmetyst type="submit">Send Invite</ButtonAmetyst>
                    <ButtonPrimary type="button" onClick={()=>setAddChat(false)}>Close</ButtonPrimary>
                </div> 
            </form> 
            </div>            
        </section>
    )
}

export default CreateChat