import Contact from "./contact";
import SearchBar from "./search";

function ContactSection(props){
    return(
        <section className="contact-section flex flex-col gap-2 p-2 bg-dark shadow-md border-e-2 border-primary h-screen">
            <div className="pb-3 space-y-2 border-b-[1px] border-secondary">
            <h1 className="text-2xl text-center text-white">User Chat</h1>
            <SearchBar></SearchBar>
            </div>
            <div className="contacts-wrapper relative overflow-auto flex gap-2 justify-center flex-col items-center">
                <Contact userName="user1" lastText="See you soon punk!!!!" isActive="true" img="/logo192.png" activeTime="9:00PM"></Contact>
                <Contact userName="user1" lastText="See you soon punk!!!!" isActive="true" img="/logo192.png" activeTime="9:00PM"></Contact>
                <Contact userName="user1" active={true} lastText="See you soon punk!!!!" isActive="true" img="/logo192.png" activeTime="9:00PM"></Contact>
                <Contact userName="user1" lastText="See you soon punk!!!!" isActive="true" img="/logo192.png" activeTime="9:00PM"></Contact>
                <Contact userName="user1" lastText="See you soon punk!!!!" isActive="true" img="/logo192.png" activeTime="9:00PM"></Contact>
                <Contact userName="user1" lastText="See you soon punk!!!!" isActive="true" img="/logo192.png" activeTime="9:00PM"></Contact>
            </div>
        </section>
    )
}

export default ContactSection; 