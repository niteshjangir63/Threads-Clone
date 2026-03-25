import { useState } from "react"
import Card from "../components/Cards/Card"
export default function Notification(){

    const [notification, setNotification] = useState([1,5]);

    return (

        <>
        {!notification && <span style={{color:"gray"}}>No more notifications</span>}
        {
           notification &&  notification.map(()=>{

                return <Card/>
            })
        }
        </>
    )
}