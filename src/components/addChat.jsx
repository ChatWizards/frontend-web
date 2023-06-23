import { apiInstance } from "../hooks/useFetch"
import { Button, ButtonAmetyst, ButtonPrimary } from "./button"
import Input from "./input"
import { useContext } from "react"
import { ToastContext, UserContext } from "../contexts"

function CreateChat(){
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
        <section className="bg-dark rounded-md p-2">
            <h1 className="text-lg uppercase font-mono font-medium text-white">Indivisual Chat</h1>
            <div className="flex gap-2">
                <Input name="contact" placeholder="Enter email or username" required="true"></Input> 
                <ButtonPrimary type="submit">Add</ButtonPrimary>
            </div>            
        </section>
    )
}

export default CreateChat