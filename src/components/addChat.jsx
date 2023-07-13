import { apiInstance } from "../hooks/useFetch"
import { Button, ButtonAmetyst, ButtonPrimary } from "./button"
import Input from "./input"
import { useContext } from "react"
import { ToastContext, UserContext } from "../contexts"

function CreateChat(props){
    const {setToastMsg} = useContext(ToastContext)
    const {user} = useContext(UserContext)
    

    function createChat(contact){
        apiInstance.post('/chat/create',{users:[contact],chatType:"indivisual"},{headers:{'Authorization': 'Bearer ' + user.token}})
            .then((res)=>{
                const {data} = res
                if(data.status==201){
                    setToastMsg({type:"success",message:data.message})
                    props.setChats(data.response)
                }
                else if(data.status==204) setToastMsg({type:'error',message:"user is not on ChatWizards.           Invitation is sent"})
            })
            .catch(err=>{
               console.log(err)
               const {data} = err?err.response:""
               setToastMsg({type:"error",message:data.message})
            })
    }   

    function handleSubmit(e){
        e.preventDefault()   
        const {contact} = e.target
        createChat(contact.value)
    }

    return(
        <section className="bg-dark rounded-md p-2">
            <h1 className="text-lg uppercase font-mono font-medium text-white">Indivisual Chat</h1>
            <form className="flex gap-2" onSubmit={handleSubmit}>
                <Input name="contact" placeholder="Enter email or username" required="true"></Input> 
                <ButtonPrimary type="submit">Add</ButtonPrimary>
            </form>            
        </section>
    )
}

export default CreateChat