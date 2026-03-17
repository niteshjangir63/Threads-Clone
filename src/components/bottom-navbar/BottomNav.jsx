import "./BottomNav.css"
import { Link } from "react-router-dom"
export default function BottomNav() {

    let links = [<i className="fa-solid fa-house"></i>, <i className="fa-solid fa-magnifying-glass"></i>, <i className="fa-solid fa-plus"></i>, <i className="fa-regular fa-heart"></i>, <i className="fa-solid fa-circle-user"></i>]
    return (

        <>

            <div className="bottom-navbar">
                <ul className="links" >
                    {
                        links.map((link) =>

                            <Link className="link p-2">{link}</Link>
                        )
                    }

                </ul>
            </div>

        </>
    )

}