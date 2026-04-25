import { useContext, useEffect, useState } from "react";
import ImagePreview from "../Image-Preview/ImagePreview";
import "./ProfileHeader.css"
import { updateProfileImage } from "../../api/profileApi";
import toast from "react-hot-toast";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../loader/Loader";
export default function ProfileHeader({ profileData }) {
    const { authUser } = useContext(AuthContext);
    const [loading,setLoading] = useState(false);






    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!file) {
            setPreview(null);
            return;
        }

        const url = URL.createObjectURL(file);
        setPreview(url);

        return () => URL.revokeObjectURL(url);
    }, [file]);

    const handleUpdateProfile = async () => {
        setLoading(true);
        try {

            if (!file) {
                toast.error("Please select an image first");
                return;
            }

            const formData = new FormData();
            formData.append("image", file);

            const res = await updateProfileImage(formData);

            toast.success(res.data.message);

            setFile(null);
            setPreview(null);

        } catch (e) {
            toast.error(e.response?.data?.message || "Error");
        }

        finally{
            setLoading(false)
        }
    };


  
    if (!profileData) return;
    return (

        <>

            <div className="d-flex flex-col p-3 mb-2 text-light profileHeader">

                <div className="row ml-auto profileInner">
                    <h3 className="text-start ">{profileData.username}</h3>
                    <span className="text-start">{profileData.name}</span>
                </div>
                {authUser?._id === profileData?._id && (
                    <input
                        type="file"
                        id="profileImage"
                        onChange={(e) => setFile(e.target.files[0])}
                        style={{ display: "none" }}
                    />
                )}
                <label htmlFor="profileImage" className="ms-auto profileImage" style={{ cursor: "pointer" }}>

                    <img src={profileData.profile} alt={profileData.profile} />


                </label>

            </div>

            {preview && (
                <div
                    className="imageOverlay"
                    onClick={() => setPreview(null)}
                >
                    <button
                        className="btn btn-dark border-0 closeBtn"
                        onClick={(e) => {
                            e.stopPropagation();
                            setPreview(null);
                        }}
                    >
                        ✕
                    </button>

                    <div onClick={(e) => e.stopPropagation()}>
                        <ImagePreview
                            image={preview}
                            width={300}
                            height={300}
                            radiusInPer={100}
                        />
                        <button className="btn btn-light mt-3" onClick={handleUpdateProfile}>{loading ? <Loader color="black"/> : <>Update</> }</button>
                    </div>
                </div>
            )}





        </>
    )
}