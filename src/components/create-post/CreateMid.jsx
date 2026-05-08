import { useState, useEffect, useContext } from "react"
import "./Create.css"
import { AuthContext } from "../../context/AuthContext";
import { useTheme } from "../../context/Appearance";

export default function CreateMid({ setData }) {

    const [content, setContent] = useState("");
    const {authUser} = useContext(AuthContext);
    const {theme} = useTheme();

    useEffect(() => {
        setData(content);
    }, [content, setData]);

    return (
        <div className="card-mid d-flex mt-5">
            <div className="card-image bottom-card-image">
                <img src={authUser.profile} alt="" />
            </div>

            <textarea
                className={`border-0 outline-0 bg-transparent ms-2 w-100 ${theme ? "text-dark" : "text-light"}`}
                value={content}
                placeholder="Add to thread"
                onChange={(e) => setContent(e.target.value)}
            />
        </div>
    )
}