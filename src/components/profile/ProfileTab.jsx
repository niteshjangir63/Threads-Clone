import ProfileActions from "./ProfileActions";
import ProfileBio from "./ProfileBio";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";

export default function ProfileTab({profile}){

    return (

        <>
        
        <ProfileHeader profileData={profile}/>
        <ProfileBio profileData={profile}/>
        <ProfileInfo profileData={profile}/>
        <ProfileActions/>
        <hr />
        </>
    )
}