import { useState, useContext } from "react"
import "./Navbar.css"
import { Link, useNavigate } from "react-router-dom"
import Create from "../create-post/Create"
import { AuthContext } from "../../context/AuthContext"
import { NotificationContext } from "../../context/NotificationContext"
export default function Navbar() {
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
            <div className="container Nav-bar ">
                <h1 className="mt-5 mb-5 logo"><i className="fa-brands fa-threads"></i></h1>
                <div className="col nav-inner">



                    <ul className="row text-center p-4 links nav-links-middle" >
                        <Link className="link p-3"
                            to="/"
                            onClick={() => {
                                document
                                    .querySelector(".middleContainer")
                                    ?.scrollTo({ top: 0, behavior: "smooth" });
                            }}
                        >
                            {icons[0]}
                        </Link>
                        {/* <Link className="link p-3" to={"/"}>{icons[0]}</Link> */}
                        <Link className="link p-3" to={"/search"}>{icons[1]}</Link>
                        <button className="link p-3 btn border-0" onClick={handleCreate}>{icons[2]}</button>
                        

                            <Link className="notification-btn link p-3" style={{height:"inherit"}} to={"/notification"}>{icons[3]} {unreadCount > 0 && (
                                <span className="notification-count">
                                    {unreadCount > 9 ? "9+" : unreadCount}
                                </span>
                            )}</Link>


                    
                        <Link className="link p-3" to="/profile"
                            onClick={() => {
                                document
                                    .querySelector(".middleContainer")
                                    ?.scrollTo({ top: 0, behavior: "smooth" });
                            }}>{icons[4]}</Link>


                    </ul>

                    <ul className="row p-4 text-center links nav-links-bottom">

                        <Link className="link p-3" to={"/pin"}><i className="fa-solid fa-thumbtack"></i></Link>
                        <Link className="link mb-5 p-3" to={"/more"}><i className="fa-solid fa-bars-staggered"></i></Link>
                    </ul>
                </div>

            </div>

            {display && <Create setDisplay={setDisplay} />}
        </>
    )
}