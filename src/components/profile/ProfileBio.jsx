import "./ProfileHeader.css"
export default function ProfileBio({ profileData }) {

    if (!profileData) return;
    return (

        <>

            <p className="m-2 text-light text-start">{profileData.bio}</p>

        </>
    )

}