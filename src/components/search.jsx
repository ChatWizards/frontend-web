export default function SearchBar(props){
    return(
        <section className="searchBar">
            <input type="text" onChange={(e)=>{
                props.setSearchQuery(e.target.value)
            }} 

            onKeyDown={(e)=>{
                if(e.code=="Enter"){/*code to send message*/}
            }} placeholder={props.placeholder||"🔍Type here to search"} className="border-b-2 border-primary search w-full bg-secondary text-light-text rounded-xl px-4 py-2"/>
        </section>
    )
}