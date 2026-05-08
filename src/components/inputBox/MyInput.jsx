import { useTheme } from "../../context/Appearance"

export default function MyInput({value,onChange}){

    const {theme} = useTheme();

    return <input className={`order-0 bg-transparent ml-auto mt-auto w-100 ${theme ? "text-dark" : "text-light"}`} placeholder="Add comments" value={value} onChange={onChange} style={{outline:"none"}}/>
}