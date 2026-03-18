import Skeleton from "../skeleton/Skeleton"
import "./Post.css"
import { useState } from "react";
export default function PostFeed(){
    
    const [loader, setLoader] = useState(false);

    return (

        <>
        
        <div className="mb-3 placeholder-glow">
                            <span class="placeholder col-6"></span>
                            <span class="placeholder col-6"></span>
                            <span class="placeholder col-6"></span>
                            <span class="placeholder col-3"></span>
                        </div>

        <div className="col-6 post">
                            {!loader && <Skeleton />}
        
                            <img src="https://plus.unsplash.com/premium_photo-1669295395788-2c22b1431f24?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image" onLoad={() => setLoader(true)} style={{
                                opacity: loader ? 1 : 0,
                                transition: "opacity 0.4s ease"
                            }} />
                        </div>

        </>
    )
}