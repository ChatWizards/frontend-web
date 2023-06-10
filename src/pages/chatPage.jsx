import ContactSection from "../components/contactSection";
import ChatSection from "../components/chatSection";

function ChatPage(props){
    return(
        <section className="chat-page-wrapper ps-12 grid grid-cols-12 grid-flow-col">
            <div className="col-span-12 sm:col-span-4 lg:col-span-3">
                <ContactSection></ContactSection>
            </div>
            <div className="col-span-9 hidden sm:grid md:col-span-8 lg:col-span-9">
                <ChatSection></ChatSection>
            </div>
        </section>
    )
}

export default ChatPage