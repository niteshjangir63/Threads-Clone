import "./Create.css"
export default function CreateHeader() {

    return (

        <div className="create-header d-flex flex-row align-items-center justify-content-start">
            <div className="card-image connect-line ml-auto">
                <img src="https://wallpaperaccess.com/full/1846802.jpg" alt="" />
            </div>

            <div className="card-right">
                <span>username</span>
                <input type="text" className="border-0 bg-transparent" placeholder="Start a thread" />
            </div>

        </div>
    )
}