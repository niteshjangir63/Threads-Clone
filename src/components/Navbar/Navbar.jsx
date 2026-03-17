import "./Navbar.css"
import { Link } from "react-router-dom"
export default function Navbar(){
    let links = [<i class="fa-solid fa-house"></i>,<i class="fa-solid fa-magnifying-glass"></i>,<i class="fa-solid fa-plus"></i>,<i class="fa-regular fa-heart"></i>,<i class="fa-solid fa-circle-user"></i>]

    return (

        <>
        <div className="container Nav-bar ">
                <h1 className="mt-5 mb-5 logo"><i class="fa-brands fa-threads"></i></h1>
            <div className="col nav-inner">


               
                    <ul className="row text-center p-4 links nav-links-middle" >
                        {
                            links.map((link) =>
                            
                                <Link className="link p-3">{link}</Link>
                            )
                        }
                        
                    </ul>

                    <ul className="row p-4 text-center links nav-links-bottom">

                        <Link className="link p-3"><i class="fa-solid fa-thumbtack"></i></Link>
                        <Link className="link mb-5 p-3"><i class="fa-solid fa-bars-staggered"></i></Link>
                    </ul>
                </div>
            
        </div>
        </>
    )
}