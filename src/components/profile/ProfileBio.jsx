import { useTheme } from "../../context/Appearance";
import "./ProfileHeader.css"
export default function ProfileBio({ profileData }) {
    const {theme} = useTheme();

    if (!profileData) return;
    return (

        <>

            <p className={`m-2 text-start ${theme ? "text-dark" : "text-light"}`}>{profileData.bio}</p>

        </>
    )

}