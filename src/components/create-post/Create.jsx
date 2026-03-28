import "./Create.css"
import CreateBottom from "./CreateBottom"
import CreateHeader from "./CreateHeader"
import CreateMid from "./CreateMid"
export default function Create({handleClick}) {

    
    function handleOuterClick(e) {

        if (e.target === e.currentTarget) {

            handleClick();
        }
    }

    return (
        <>
            <div className="Outer-Container" onClick={handleOuterClick}>

                
                <div className="inner-container text-light  p-3">


            <CreateHeader/>
            <CreateMid/>
            <CreateBottom/>




                </div>

            </div>
        </>
    )
}