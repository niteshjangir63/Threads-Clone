import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../api/profileApi";
import Loader from "../components/loader/Loader";
import { useNavigate } from "react-router-dom";
import "./UpdateProfile.css"
import {toast} from "react-hot-toast";
export default function UpdateProfile() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form, setForm] = useState({
        username: "",
        name: "",
        bio: ""
    });
    useEffect(() => {

        const fetchProfile = async () => {

            setLoading(true);
            try {

                const res = await getProfile();
                const user = res.data.user;
                setForm({ username: user.username, name: user.name, bio: user.bio })

            }
            catch (e) {

                toast.error(e.response.data.message);
            }
            finally{
                setLoading(false);
            }


        }
        fetchProfile();

    }, [])


    const handleUpdate = async (e) => {

        setLoading(true)
        try {

            const res = await updateProfile(form);
            toast.success(res.data.message);
            navigate('/profile')


        }
        catch (e) {
            toast.error(e.response.data.message)
            console.log(e);
        }
        finally {

            setLoading(false)

        }



    }
    const handleForm = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    return (
        <>
            <h5 className="text-light mb-3 fw-semibold">Edit Profile</h5>

            <div className="threads-form text-light d-flex flex-column text-start">

                <div className="mb-3">
                    <label className="threads-label ">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleForm}
                        className="threads-input"
                        placeholder="Username"
                    />
                </div>

                <div className="mb-3">
                    <label className="threads-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleForm}
                        className="threads-input"
                        placeholder="Name"
                    />
                </div>

                <div className="mb-3">
                    <label className="threads-label">Bio</label>
                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleForm}
                        className="threads-input"
                        rows="3"
                        placeholder="Write something..."
                    />
                </div>

                <button
                    className="threads-btn w-100"
                    onClick={handleUpdate}
                    disabled={loading}
                >
                    {loading ? <Loader /> : "Save"}
                </button>

            </div>
        </>
    );
}