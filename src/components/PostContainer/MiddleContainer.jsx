import "./MiddleContainer.css"
import { Outlet } from "react-router-dom";
export default function MiddleContainer({pathName}) {

  

    return (

        <>
            <span style={{ color: "white", position: "relative", top: "10px" }}>{pathName == "/" ? pathName = "Home" : pathName[1].toUpperCase() + pathName.slice(2)}</span>

            <div className="container middleContainer mt-5 p-3">
                
                <Outlet/>
            </div>

        </>
    )
}