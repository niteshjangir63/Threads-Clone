import { useContext, useState } from "react";
import "./BottomNav.css"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext";
import Create from "../create-post/Create";
import { NotificationContext } from "../../context/NotificationContext";
export default function BottomNav({ handleClick }) {
    const { authUser } = useContext(AuthContext)
    const { unreadCount } = useContext(NotificationContext)
    const navigate = useNavigate();

    let icons = [<i className="fa-solid fa-house"></i>, <i className="fa-solid fa-magnifying-glass"></i>, <i className="fa-solid fa-plus"></i>, <i className="fa-regular fa-heart"></i>, <i className="fa-solid fa-circle-user"></i>]

    const [display, setDisplay] = useState(false);

    function handleCreate() {

        if (!authUser) return navigate("/login")
        else {

            setDisplay(prev => !prev);
        }

    }

    return (

        <>

            <div className="bottom-navbar">


                <ul className="links" >
                    <Link className="link p-2" to={"/"}>{icons[0]}</Link>
                    <Link className="link p-2" to={"/search"}>{icons[1]}</Link>
                    <button className="link p-3 btn border-0" onClick={handleCreate}>{icons[2]}</button>
                    <Link className="notification-btn link p-3" style={{ height: "inherit" }} to={"/notification"}>{icons[3]} {unreadCount > 0 && (
                        <span className="notification-count">
                            {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                    )}</Link>
                    <Link className="link p-2" to={"/profile"}>{icons[4]}</Link>



                </ul>


            </div>

            {display && <Create setDisplay={setDisplay} />}

        </>
    )

}