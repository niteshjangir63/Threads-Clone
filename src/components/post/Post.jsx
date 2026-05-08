
import { useTheme } from "../../context/Appearance";
import "./Post.css"
import PostActions from "./PostActions";
import PostFeed from "./PostFeed";
import PostHeader from "./PostHeader";


export default function Post({ post }) {
    const {theme} = useTheme();


    if(!post) return;

    return (

        <>

            <div className="container post-box p-3">


                <PostHeader postInfo={post} />

                <PostFeed postInfo={post} />

                <PostActions postInfo={post} />




            </div>
            <hr style={{color: theme ? "black" : "white"}}/>

        </>
    )
}