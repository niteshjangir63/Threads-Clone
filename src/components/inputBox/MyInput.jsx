export default function MyInput({value,onChange}){

    return <input className=" border-0 bg-transparent ml-auto mt-auto w-100" placeholder="Add comments" value={value} onChange={onChange} style={{outline:"none",color:"white"}}/>
}