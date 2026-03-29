import { useEffect, useState } from "react"
import Post from "../components/post/Post"
import ProfileTab from "../components/profile/ProfileTab"
import axios from "axios"
import { useParams } from "react-router-dom"
import Loader from "../components/loader/Loader"
export default function Profile() {
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState(null);
    const { username } = useParams();
    useEffect(() => {
        setLoading(true);
        const fetchProfile = async () => {
            try {
                const { data } = await axios.get(
                    `http://localhost:8080/profile/${username}`,
                    { withCredentials: true }
                );
                setProfile(data);
            } catch (error) {
                console.error(error);
            }
            finally {

                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    console.log(profile)



    return (

        <>
            {loading && <Loader/>}
            {profile ?
                <><ProfileTab profile={profile} />
                    <Post /> </> : !loading && <h1>user not found</h1>}
        </>
    )
}