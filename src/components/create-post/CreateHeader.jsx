import "./Create.css"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
export default function CreateHeader() {

    const {authUser} = useContext(AuthContext);

    return (

        <div className="create-header d-flex flex-row align-items-center justify-content-start">
            <div className="card-image connect-line ml-auto">
                <img src={authUser.profile} alt="" />
            </div>

            <div className="card-right">
                <span>{authUser.username}</span>
                <input type="text" className="border-0 bg-transparent" placeholder="Start a thread" />
            </div>

        </div>
    )
}