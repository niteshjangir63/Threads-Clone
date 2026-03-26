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

                    <div className="dropdown ms-auto">
                        <button
                            className="btn text-light border-0"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            <i className="fa-solid fa-ellipsis"></i>
                        </button>

                        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                           
                                <button className="dropdown-item">Copy <i class="fa-solid fa-link ms-auto"></i></button>
                            
                        </ul>
                    </div>


                </div>

            </div>

        </>
    )
}