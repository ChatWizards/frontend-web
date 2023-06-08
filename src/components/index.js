import {ButtonPrimary,ButtonAmetyst} from './button'
import Contact from './contact'
import { MessagePrimary } from './message'

export default function Component(){
    return(
        <section className="px-10 py-4">
            <div className="space-x-2 space-y-1">
                <ButtonPrimary>Hello</ButtonPrimary>
                <ButtonAmetyst>Hello</ButtonAmetyst>
                <section className="chat-section bg-gray-400 rounded-md">
                <MessagePrimary text="Lorem Ipsum is simply dummy text of the printing 
                and typesetting industry. Lorem Ipsum has been the industry's standard 
                dummy text ever since the 1500s, when an unknown printer took a galley 
                of type and scrambled it to make a type specimen book. It has survived 
                not only five centuries,but also the leap into electronic typesetting, 
                remaining essentially unchanged.  It was popularised in the 1960s with 
                the release of Letraset sheets containing Lorem Ipsum passages, and more 
                recently with desktop publishing software like Aldus PageMaker including 
                versions of Lorem Ipsum."></MessagePrimary>
                <MessagePrimary text="this is a Messgae" type="secondary"></MessagePrimary>                    
                </section>
                <Contact userName="Contact name" active={true} image="logo192.png" lastText="hello junior!! This is senior with super senior waiting for sub junior in the sub way minor
                ." activeTime="9:30pm" isActive={true}></Contact>
                <Contact userName="Contact name" active={true} image="logo192.png" lastText="hello junior!! This is senior with super senior waiting for sub junior in the sub way minor
                ." activeTime="9:30pm" isActive={true}></Contact>
            </div>
            
        </section>
    )
}