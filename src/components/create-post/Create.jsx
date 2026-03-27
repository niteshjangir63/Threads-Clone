import "./Create.css"
import CreateBottom from "./CreateBottom"
import CreateHeader from "./CreateHeader"
import CreateMid from "./CreateMid"
export default function Create() {

    return (
        <>
            <div className="Outer-Container">

                <div className="inner-container text-light  p-3">


            <CreateHeader/>
            <CreateMid/>
            <CreateBottom/>




                </div>

            </div>
        </>
    )
}