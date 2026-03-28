import "./BottomNav.css"
import { Link } from "react-router-dom"
export default function BottomNav({handleClick}) {

    let icons = [<i className="fa-solid fa-house"></i>, <i className="fa-solid fa-magnifying-glass"></i>, <i className="fa-solid fa-plus"></i>, <i className="fa-regular fa-heart"></i>, <i className="fa-solid fa-circle-user"></i>]
    return (

        <>

            <div className="bottom-navbar">
                

                <ul className="links" >
                        <Link className="link p-2" to={"/"}>{icons[0]}</Link>
                        <Link className="link p-2" to={"/search"}>{icons[1]}</Link>
                        <Link className="link p-2" onClick={handleClick}>{icons[2]}</Link>
                        <Link className="link p-2" to={"/notification"}>{icons[3]}</Link>
                        <Link className="link p-2" to={"/profile"}>{icons[4]}</Link>
                       
                        
                        
                    </ul>

                
            </div>

        </>
    )

}