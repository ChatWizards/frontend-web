import { useState } from 'react'
import AddChat from '../addChat'
import Contact from '../contact'
import { ButtonPrimary } from '../button'
import useFetch from '../../hooks/useFetch'

function ChatModal(props){
    const [selectedContacts,setSelectedContacts] = useState([])

    function updateSelectedMembers(e){
        setSelectedContacts((prev)=>{
            if(prev.filter((ele)=>(ele==ele.target.key)).length){
                return prev.filter((ele)=>ele!=ele.target.key)
            }
            return [...prev,e.target.key]
        })

    }


    return(
        <>
            <AddChat></AddChat>
            <h1 className='text-lg uppercase font-mono p-2 text-white text-bold'>Group Chat</h1>
            <div className='flex gap-1 items-center p-2 flex-wrap max-h-[180px]'>
                {selectedContacts.map((i)=>{
                    return(
                        <span className='tag bg-primary text-dark p-1 text-sm rounded-md'>
                        {i.userName}
                        <button className='bg-light-text rounded-md ms-2 text-sm'>✖️</button>
                        </span>
                    )
                })}
            </div>
            <div className='flex flex-col gap-2 px-3 h-[300px] mt-3'>
                <h1 className='border-b-2 uppercase font-mono mx-5 px-2 text-white'>Contacts</h1>
                {props.contacts&&props.contacts.length?props.contacts.map((i)=>{
                    return(
                    <article className='relative contact flex items-center gap-3 bg-dark rounded-md py-2' key={'random'} onClick={updateSelectedMembers}>
                        <img src="/logo.svg" className='rounded-full' width={50} height={50} alt="" />
                        <p className='text-primary'>Username</p>
                        <span className='absolute right-5 rounded bg-white cursor-pointer'>✖️</span>
                    </article>
                    )}):<h1 className='text-primary text-center'>No contacts here</h1>
            }
            </div>
            <div className='pt-4 flex justify-center'>
                <ButtonPrimary>Create Group</ButtonPrimary>
            </div>

        </>
    )
}

export default ChatModal