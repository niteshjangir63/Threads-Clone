import "./ProfileHeader.css"
export default function ProfileInfo() {

    return (

        <>

            <div className="d-flex flex-col text-light m-2">

                <p className="ml-auto follower">243K followers</p>
                <div className="profileLinks ms-auto d-flex gap-3">


                    <span>

                        <i class="fa-brands fa-instagram"></i>
                    </span>
                    <span>

                        <i class="fa-solid fa-ellipsis"></i>
                    </span>


                </div>

            </div>

        </>
    )
}