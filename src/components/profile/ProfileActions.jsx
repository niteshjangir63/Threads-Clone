import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { handleFollow } from "../../api/postApi";
import { Link } from "react-router-dom";

export default function ProfileActions({ profileData }) {

    const [isFollow, setIsFollow] = useState(false);
    const [loading, setLoading] = useState(false);

    const { authUser } = useContext(AuthContext);

    useEffect(() => {
        if (authUser && profileData?.followers) {
            setIsFollow(profileData.followers.includes(authUser._id));
        }
    }, [profileData, authUser]);

    const handleFollowing = async (userId) => {

        if (loading) return;

        setIsFollow(prev => !prev);
        setLoading(true);

        try {
            await handleFollow(userId);
        } catch (e) {
            setIsFollow(prev => !prev); 
           
        } finally {
            setLoading(false);
        }

    };

    if (!authUser) return null;

    return (
        <div className="d-flex flex-col m-2 mt-4 gap-2">

            {profileData._id === authUser._id ? (
                <Link className="btn btn-light col ml-auto" to={"/update/profile"}>Edit</Link>
            ) : (
                <>
                    <button
                        className="btn btn-light col-6 ml-auto"
                        onClick={() => handleFollowing(profileData._id)}
                        disabled={loading}
                    >
                        {isFollow ? "Following" : "Follow"}
                    </button>

                    <button className="btn btn-outline-light ms-auto col-6 ml-2">
                        Mention
                    </button>
                </>
            )}

        </div>
    );
}