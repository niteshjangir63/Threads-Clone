import axios from "axios";
import "./Create.css"
import CreateBottom from "./CreateBottom"
import CreateHeader from "./CreateHeader"
import CreateMid from "./CreateMid"
import { useState, useEffect } from "react";
import { usePosts } from "../../context/PostContext";
import toast from "react-hot-toast";

export default function Create({ setDisplay }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [form, setForm] = useState({ content: "", file: null });
    const { addPost } = usePosts();

    useEffect(() => {
        setForm(prev => ({
            ...prev,
            content: data
        }));
    }, [data]);

    
    function handleOuterClick(e) {
        if (e.target === e.currentTarget) {
            setDisplay(prev => !prev)
        }
    }

    const handleCreate = async () => {
        try {
            if (form.content || form.file) {

                setLoading(true);

                const formData = new FormData();
                formData.append("content", form.content);

                if (form.file) {
                    formData.append("image", form.file);
                }

                const res = await axios.post(
                    "http://localhost:5000/create",
                    formData,
                    {
                        withCredentials: true
                    }
                );

                if (res?.data?.success) {
                    toast.success(res.data.message)
                    addPost(res.data.post);
                    setDisplay(prev => !prev);
                }

            }
        } catch (e) {
           
            toast.error(e.response.data.message)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="Outer-Container" onClick={handleOuterClick}>
            <div className="inner-container text-light p-3">

                <CreateHeader />
                <CreateMid setData={setData} />

                <CreateBottom
                    handleCreate={handleCreate}
                    setForm={setForm}
                    loading={loading}
                />

            </div>
        </div>
    )
}