import { useEffect } from "react"
import "./ImagePreview.css"
export default function ImagePreview({ image, heights,height, width, radius, radiusInPer ,setPreview,setFile,setForm}) {


    useEffect(()=> {

        document.body.style.overflow = "hidden";

        return () =>{document.body.style.overflow ="auto"} 

    },[]);
    return (


        <>

            <div className="imagePreviewCard" style={{ height:`${heights}%`,height: `${height}px`, width: `${width}px`, borderRadius: radiusInPer ? `${radiusInPer}%` : `${radius}px` }}>
            {/* <button className="btn btn-danger" id="imgPreviewClose" onClick={() => {setPreview(null); setFile(null) ; setForm(prev => ({ ...prev, file: null }));}}>X</button> */}

                <img src={image} alt={image} />
            </div>

        </>
    )
}