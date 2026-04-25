import "./ImagePreview.css"
export default function ImagePreview({ image, height, width, radius, radiusInPer ,setPreview,setFile,setForm}) {

    return (


        <>

            <div className="imagePreviewCard" style={{ heights:`{height}%`,height: `${height}px`, width: `${width}px`, borderRadius: radiusInPer ? `${radiusInPer}%` : `${radius}px` }}>
            <button className="btn btn-danger" id="imgPreviewClose" onClick={() => {setPreview(null); setFile(null) ; setForm(prev => ({ ...prev, file: null }));}}>X</button>

                <img src={image} alt={image} />
            </div>

        </>
    )
}