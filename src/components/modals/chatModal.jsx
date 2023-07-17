import { useContext, useState } from 'react'
import AddChat from '../addChat'
import { ButtonPrimary } from '../button'
import { ContactContext } from '../../contexts'
import CreateGroup from './createGroup'

function ChatModal(props){
    const [selectedContacts,setSelectedContacts] = useState([])
    const [groupPane,setGroupPane] = useState(false)
    const {contacts} = useContext(ContactContext)

    function updateSelectedMembers(id){
        setSelectedContacts((prev)=>{
            if(prev.filter((ele)=>(ele._id==id)).length){
                return prev.filter((ele)=>ele._id!=id)
            }else{ 
                let k = contacts.find(ele=>ele._id===id)
                return [...prev,k]
            }
        })
    }

    function createGroup(){
        const userIds = selectedContacts.map((ele)=>{return ele._id})
    }


    return(
        <>
            <AddChat setChats={props.setChats}></AddChat>
            <h1 className='text-lg uppercase font-mono p-2 text-white text-bold'>Group Chat</h1>
            <div className='flex gap-1 items-center p-2 flex-wrap max-h-[180px]'>
                {selectedContacts.length?selectedContacts.map((i)=>{
                    return(
                        <article className='tag flex gap-1 items-center bg-dark-200 text-white backdrop-blur-lg p-1 text-sm rounded-md'>
                         <img src={i.profilePic} alt={i.userName} className='rounded-full bg-primary' width={30} height={30} />
                         <span className='text-lg'>{i.userName}</span>                           
                         <button className='bg-white rounded-full text-sm' onClick={()=>updateSelectedMembers(i._id)}>
                            <img src="/icons/close.svg" alt="x" className='rounded-full' width={20} height={20} />
                        </button>
                        </article>
                    )
                }):<h1 className='text-primary text-sm font-bold text-center'>select contacts to create group</h1>}
            </div>
            <div className='flex flex-col gap-2 px-3 h-[300px] mt-3'>
                <h1 className='border-b-2 uppercase font-mono mx-5 px-2 text-white'>Contacts</h1>
                {contacts.length?contacts.map((i,index)=>{
                    return(
                    <article className='relative contact flex items-center gap-3 bg-dark rounded-md py-2 ps-3' key={i._id}  onClick={()=>updateSelectedMembers(i._id)}>
                        <img src={i.profilePic} className='rounded-full' width={35} height={35} alt="" />
                        <p className='text-primary'>{i.userName}</p>
                        {/* <img className='absolute right-5 h-6 p-1 hover:bg-secondary duration-200 hover:shadow-sm hover:shadow-white aspect-square bg-white cursor-pointer rounded-full' src='/icons/close.svg'/> */}
                    </article>
                    )}):<h1 className='text-primary text-center'>No contacts here</h1>
            }
            </div>
            <div className='pt-4 flex justify-center'>
                <ButtonPrimary onClick={()=>{setGroupPane(true)}}>Create Group</ButtonPrimary>
            </div>
            {groupPane&&<CreateGroup selectedContacts={selectedContacts} setGroupPane={setGroupPane} updateSelectedMembers={updateSelectedMembers} setChats={props.setChats}></CreateGroup>}
        </>
    )
}

export default ChatModal