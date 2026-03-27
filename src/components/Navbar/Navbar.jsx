import { useState } from "react"
import "./Navbar.css"
import { Link } from "react-router-dom"
export default function Navbar({handleClick}){
    let icons = [<i class="fa-solid fa-house"></i>,<i class="fa-solid fa-magnifying-glass"></i>,<i class="fa-solid fa-plus"></i>,<i class="fa-regular fa-heart"></i>,<i class="fa-solid fa-circle-user"></i>]
    let links = ["/","/search",""]
    
    return (



        <>
        <div className="container Nav-bar ">
                <h1 className="mt-5 mb-5 logo"><i class="fa-brands fa-threads"></i></h1>
            <div className="col nav-inner">


               
                    <ul className="row text-center p-4 links nav-links-middle" >
                        <Link className="link p-3" to={"/"}>{icons[0]}</Link>
                        <Link className="link p-3" to={"/search"}>{icons[1]}</Link>
                        <Link className="link p-3" onClick={handleClick}>{icons[2]}</Link>
                        <Link className="link p-3" to={"/notification"}>{icons[3]}</Link>
                        <Link className="link p-3" to={"/profile"}>{icons[4]}</Link>
                        
                        
                    </ul>

                    <ul className="row p-4 text-center links nav-links-bottom">

                        <Link className="link p-3" to={"/pin"}><i class="fa-solid fa-thumbtack"></i></Link>
                        <Link className="link mb-5 p-3" to={"/more"}><i class="fa-solid fa-bars-staggered"></i></Link>
                    </ul>
                </div>
            
        </div>
        </>
    )
}