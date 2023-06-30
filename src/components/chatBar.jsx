import { useState,forwardRef, useEffect, useContext } from "react"
import {ButtonPrimary} from './button'
import useFetch from "../hooks/useFetch"
import { ChatContext, UserContext } from "../contexts"
import {BarLoader} from 'react-spinners'

const Chatbar = forwardRef((props,ref)=>{
    const [selectedFiles,setSelectedFiles] = useState([])
    const {chatState} = useContext(ChatContext)
    const {user} = useContext(UserContext)
    const [upload,setUpload] = useState()
    const [loading,setLoading] = useState(true)
    const [uploadModal,setUploadModal] = useState(false)
    

    const handleFileUpload = (e) => {
        const files = e.target.files;
        console.log(e)
        const uniqueFiles = Array.from(files).filter(file => (
          !selectedFiles.some(selectedFile => selectedFile.name === file.name)
        ));
        console.log(uniqueFiles)
        setSelectedFiles(prevSelectedFiles => [...prevSelectedFiles, ...uniqueFiles]);
      };
    

    // const[,loading,]=useFetch({url:"chat/file",method:"post",postData:{user,files:selectedFiles,chat:chatState.id}})

    useEffect(()=>{console.log(selectedFiles)},[selectedFiles])


    return(
        <>
            <div className="chatbar-wrapper w-full relative">
                {uploadModal&&(
                    <div className="file-upload-modal shadow-lg shadow-dark absolute top-0 left-0 -translate-y-full bg-dark rounded w-[300px] h-[400px]">
                        <div className="relative w-full">
                            <input multiple onChange={handleFileUpload} type="file" className="bg-primary file-input text-dark w-full rounded-lg p-4"/>
                            <button onClick={()=>{setUploadModal(false)}} className="close-btn w-5 hover:bg-secondary rounded-full borderdark duration-200 absolute right-0 bg-white top-1/2 -translate-y-1/2 -translate-x-1/2">
                                <img src="/icons/close.svg" alt="x" className="rounded-full" />
                            </button>
                        </div>
                        <div className="selected-file-pillet-wrapper w-100 grid grid-cols-2 gap-2 p-1">
                            {selectedFiles.map((i,index)=>(
                                <span key={index} className="flex bg-primary items-center justify-between rounded-md py-1 px-2 text-white">
                                    {i.name}
                                    <button className="bg-white hover:bg-primary hover:border-dark border-2 border-white duration-200 w-4 h-4 rounded-full" onClick={()=>{setSelectedFiles((prev)=>(prev.filter(ele=>ele.name!=i.name)))}}>
                                        <img src="/icons/close.svg"/>
                                    </button>
                                </span>
                            ))}
                        </div>

                        <div className="flex w-full justify-center absolute bottom-5 m-auto">
                            {loading?
                            <BarLoader width={50} color="#f6d7b7" loading={loading} height={2}>
                            </BarLoader>
                            :<ButtonPrimary>Upload</ButtonPrimary>}
                        </div>
                    </div>                
                )}

            <textarea ref={ref} type="text" className="chatbar bg-secondary active:outline-none rounded-2xl px-4 py-2 pe-10 shadow-lg w-full text-white ps-12" rows={1} placeholder="Message"/>
            <button onClick={()=>{setUploadModal(!uploadModal)}} type="button" className="hover:bg-primary hover:opacity-75 duration-300 send-button text-white absolute left-0 top-[calc(50%-3px)] -translate-y-1/2 w-[40px] h-[37px] border-2 border-primary bg-dark rounded-xl px-3">
                <img src="/icons/attachement.png" alt="send"/>
            </button>
            <button onClick={props.sendMessage} type="button" className="send-button text-white absolute right-0 top-[calc(50%-3px)] -translate-y-1/2 w-[40px] h-[37px] bg-primary rounded-2xl px-3">
                <img src="/icons/send.svg" alt="send"/>
            </button>
            </div>
        </>
    )
})


export default Chatbar;