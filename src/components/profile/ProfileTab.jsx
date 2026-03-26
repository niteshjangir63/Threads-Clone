import ProfileActions from "./ProfileActions";
import ProfileBio from "./ProfileBio";
import ProfileHeader from "./ProfileHeader";
import ProfileInfo from "./ProfileInfo";

export default function ProfileTab(){

    return (

        <>
        
        <ProfileHeader/>
        <ProfileBio/>
        <ProfileInfo/>
        <ProfileActions/>
        <hr />
        </>
    )
}