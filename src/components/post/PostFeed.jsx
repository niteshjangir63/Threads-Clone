import Skeleton from "../skeleton/Skeleton"
import "./Post.css"
import { useState } from "react";
export default function PostFeed({ postInfo }) {

    const [loader, setLoader] = useState(false);

    console.log("Post info = ", postInfo)

    return (

        <>
            <p className="text-start mt-2">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quisquam, ipsam! Officia animi libero dolorum esse quasi, earum sit. Itaque at quae pariatur sint labore alias facere nemo ipsam provident porro.</p>

            {/* { <div className="mb-3 placeholder-glow">

            
                {<span class="placeholder col-6"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-6"></span>
                <span class="placeholder col-3"></span>}

            </div>} */}

            <div className="col-6 post">
                {!loader && <Skeleton />}

                <img src="https://images.pexels.com/photos/36135026/pexels-photo-36135026.jpeg" alt="image" onLoad={() => setLoader(true)} style={{
                    opacity: loader ? 1 : 0,
                    transition: "opacity 0.4s ease"
                }} />
            </div>

        </>
    )
}