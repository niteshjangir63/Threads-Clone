import { useState } from "react"
import "./Post.css";
import SkeletonText from "../skeleton/SkeletonText";
import Skeleton from "../skeleton/Skeleton";
export default function PostHeader(){
const [loader, setLoader] = useState(false);
    return (

        <>
        
         <div className="d-flex flex-row">
                    <span className="ml-auto mb-3 post-profile ">
                        {!loader && <Skeleton />}
                        <img src="https://img.freepik.com/premium-photo/nature-wallpaper-beautiful-nature-wallpaper-4k-nature-wallpapers-hd-nature-wallpaper-green-nature_722194-175.jpg?w=1380" alt="profile" onLoad={() => setLoader(true)} style={{
                            display: loader ? "flex" : "none", opacity: loader ? 1 : 0,
                            transition: "opacity 0.4s ease"
                        }} />
                    </span>

                    <p className="ms-2 placeholder-glow col-3">

                        {<span class="placeholder col-12"></span> || <p>Username</p>}

                    </p>
                    <p className="ms-2 placeholder-glow col-3">

                        {<SkeletonText /> || <p>follow</p>}

                    </p>


                    <span className="ms-auto placeholder-glow col-3">
                        {<span class="placeholder col-12"></span> || <i class="fa-solid fa-ellipsis"></i>}

                    </span>

                </div>

        </>
    )
}