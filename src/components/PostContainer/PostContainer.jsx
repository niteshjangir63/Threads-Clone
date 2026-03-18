import "./PostContainer.css"
import Post from "../post/Post"
export default function PostContainer() {

    return (

        <>
        <span style={{color:"white",position:"relative", top:"10px"}}>Home</span>

            <div className="container postContainer mt-5 p-3">


                <Post />
                

            </div>

        </>
    )
}