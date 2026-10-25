import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./TopPost.css"
import { useTheme } from "../../context/Appearance";
import { usePosts } from "../../context/PostContext";
import API from "../../api/axios";
import Loader from "../loader/Loader";
export default function TopPost() {
    const { authUser } = useContext(AuthContext);
    const placeholder = ["Start a thread...",
        "What's new with you?",
        "Drop your thoughts here...",
        "Anything on your mind?",
        "Share something with the community...",
        "Your next thread starts here..."];


    const [title, setTitle] = useState(placeholder[0]);
    const [animation, setAnimation] = useState(false);
    const [form, setForm] = useState({
        content: ""
    });
    const {theme} = useTheme();
    const [loader, setLoader] = useState(false);
    const { addPost } = usePosts();

    const handleSubmit = async (e) => {
        setLoader(true);
        e.preventDefault();
        if (!form.content || form.content.trim() == ' ') return;
        console.log(form.content)
        try {

            const res = await API.post("/create", form, {

                withCredentials: true
            })

            addPost(res.data.post);
        }
        catch (e) {
            console.log(e);
        }
        finally {
            setLoader(false);
            setForm(() => ({ content: "" }));
        }


    }
    console.log(form.content);
    useEffect(() => {
        const interval = setInterval(() => {
            setAnimation(true);

            setTimeout(() => {

                setTitle((prev) => {

                    const currIndex = placeholder.indexOf(prev);
                    return placeholder[(currIndex + 1) % placeholder.length];
                });

                setAnimation(false);
            }, 300)
        }, 5000)
        return () => clearInterval(interval);
    }, [])

    return (

        <>
            <div className={`d-flex flex-row align-items-center top-post-create-box ${theme && "darkmod"}`}>
                <span className="post-profile">
                    <img
                        src={authUser?.profile}
                        alt="profile"
                    />
                </span>
                <div className="inner-top-post">

                    <span>{authUser?.username}</span>
                    <input type="text" style={{color:theme? "black" : "white"}} placeholder={title} value={form.content} onChange={(e) => setForm((prev) => ({ ...prev, content: e.target.value.trimStart() }))} className={`top-post-input-box ${!form.content && animation ? "swipe" : ""}`} />
                </div>
                <button className={`btn ${theme ? "btn-dark" : "btn-light"} ms-auto`} onClick={handleSubmit} disabled={!form.content.trim()}>{loader ? <Loader color={theme ? "white" : "black"}/> : "Post"}</button>

            </div>


        </>
    )
}