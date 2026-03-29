import "./ProfileHeader.css"
export default function ProfileHeader({profileData}){

    if(!profileData) return;
    return (
        
        <>
        
        <div className="d-flex flex-col p-3 mb-2 text-light profileHeader">

            <div className="row ml-auto profileInner">
            <h3 className="text-start ">{profileData.username}</h3>
            <span className="text-start">{profileData.name}</span>
            </div>

            <div className="ms-auto profileImage">
                <img src="https://tse3.mm.bing.net/th/id/OIP.Ed2g-wjnBZBo-Q62D0S1LwHaHa?rs=1&pid=ImgDetMain&o=7&rm=3" alt="" />
            </div>
        </div>


        </>
    )
}