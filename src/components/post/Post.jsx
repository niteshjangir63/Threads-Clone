import { useState } from "react"
import "./Post.css"
import Skeleton from "../skeleton/Skeleton";
import SkeletonText from "../skeleton/SkeletonText";
export default function Post(){

    const [loader,setLoader] = useState(false);
  
    return (

        <>

        <div className="container post-box p-3">

            
                <div className="d-flex flex-row">
                    <span className="ml-auto mb-3 post-profile ">
                        {!loader && <Skeleton/>}
                        <img src="https://img.freepik.com/premium-photo/nature-wallpaper-beautiful-nature-wallpaper-4k-nature-wallpapers-hd-nature-wallpaper-green-nature_722194-175.jpg?w=1380" alt="profile" onLoad={()=> setLoader(true)} style={{display:loader ? "flex" :"none", opacity: loader ? 1 : 0,
          transition: "opacity 0.4s ease"}}/>
                    </span>

                    <p className="ms-2 placeholder-glow col-3">
                      
                     {<span class="placeholder col-12"></span> || <p>Username</p>}
         
                    </p>
                    <p className="ms-2 placeholder-glow col-3">
                      
                     {<SkeletonText/>  || <p>follow</p>}
         
                    </p>
                    

                    <span className="ms-auto placeholder-glow col-3">
                        {<span class="placeholder col-12"></span>  || <i class="fa-solid fa-ellipsis"></i>}
                        
                    </span>

                </div>
                
                <div className="mb-3 placeholder-glow">
                   <span class="placeholder col-6"></span>
                   <span class="placeholder col-6"></span>
                   <span class="placeholder col-6"></span>
                   <span class="placeholder col-3"></span>
                </div>

                <div className="col-6 post">
                    {!loader && <Skeleton/>}
                
                <img src="https://plus.unsplash.com/premium_photo-1669295395788-2c22b1431f24?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="image" onLoad={()=> setLoader(true)}  style={{
          opacity: loader ? 1 : 0,
          transition: "opacity 0.4s ease"
        }}/>
                </div>

                <div className="d-flex flex-row mt-1 gap-4 placeholder-glow">
                     {<span class="placeholder col-4"></span> || 
                    <> <span title="Like"><img className="post-bottom-button" src="src/svgIcons\heart.svg" alt="" /></span>
                    <span title="Comment"><img className="post-bottom-button" src="src\svgIcons\comment.svg" alt="" /></span>
                    <span title="Repost"><img className="post-bottom-button" src="src\svgIcons\repost.svg" alt="" /></span>
                    <span title="Share"><img className="post-bottom-button" src="src\svgIcons\share.svg" alt="" /></span> </> }

                </div>


        </div>
        <hr />

        </>
    )
}