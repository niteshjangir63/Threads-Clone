import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./TopPost.css"
export default function TopPost() {
    const { authUser } = useContext(AuthContext);
    const placeholder = ["Start a thread...",
        "What's new with you?",
        "Drop your thoughts here...",
        "Anything on your mind?",
        "Share something with the community...",
        "Your next thread starts here..."];


        const [title,setTitle] = useState(placeholder[0]);
        const [animation,setAnimation] = useState(false);
        const [content,setContent] = useState("");

        const handleInput = (e) =>{
            e.preventDefault();
            setContent(e.target.value);
        }
        useEffect(() => {    
            const interval = setInterval(() => {
                setAnimation(true);
                
                setTimeout(() =>{

                    setTitle((prev) =>{

                        const currIndex = placeholder.indexOf(prev);
                        return placeholder[(currIndex + 1) % placeholder.length];
                    });

                    setAnimation(false);
                },300)
            },5000)
            return () => clearInterval(interval);
        },[])

        console.log(title)
    return (

        <>
            <div className="d-flex flex-row align-items-center top-post-create-box">
                <span className="post-profile">
                    <img
                        src={authUser?.profile}
                        alt="profile"
                    />
                </span>
                <div className="inner-top-post">

                    <span>{authUser?.username}</span>
                    <input type="text" placeholder={title} onChange={handleInput} className={`top-post-input-box ${!content && animation ? "swipe" : ""}`}/>
                </div>
                <button className="btn btn-light ms-auto">Post</button>

            </div>
            {/* <hr /> */}

        </>
    )
}