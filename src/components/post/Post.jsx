import { useState } from "react"
import "./Post.css"
import Skeleton from "../skeleton/Skeleton";
import SkeletonText from "../skeleton/SkeletonText";
import PostActions from "./PostActions";
import PostFeed from "./PostFeed";
import PostHeader from "./PostHeader";
export default function Post() {

    const [loader, setLoader] = useState(false);

    return (

        <>

            <div className="container post-box p-3">


               <PostHeader/>

                

                    <PostFeed/>

                    <PostActions/>
               


            </div>
            <hr />

        </>
    )
}