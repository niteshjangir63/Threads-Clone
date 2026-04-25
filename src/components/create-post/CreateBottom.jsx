import "./Create.css"
import Loader from "../loader/Loader"
import { useEffect, useState } from "react"
import ImagePreview from "../Image-Preview/ImagePreview";
export default function CreateBottom(props) {
const { handleCreate, loading, setForm } = props;

    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        if (!file) return;

        const url = URL.createObjectURL(file);
        setPreview(url);

        if (setForm) {
            setForm(prev => ({ ...prev, file }));
        }

        return () => URL.revokeObjectURL(url);

    }, [file]);



    return (

        <>
            <div className="d-flex m-2">

                <label htmlFor="image" style={{ cursor: "pointer" }}><i className="fa-solid fa-image"></i></label>
                
                <input type="file" id="image" onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} />

            </div>
            <div className="d-flex m-2" style={{ maxHeight: "200px", overflow: "hidden", borderRadius: ".5rem" }}>


{preview && <ImagePreview image={preview} width={150} radius={10}  setPreview={setPreview} setFile={setFile} setForm={setForm}/>}
                
            </div>

            <div className="card-bottom d-flex flex-row align-items-center mt-3 ">
                <span>Anyone can reply or quote</span>
                <button className="ms-auto btn btn-light" onClick={handleCreate} disabled={loading && true}>{loading ? <><Loader color="black" /> Posting..</> : <>Post</>}</button>
            </div>
        </>
    )
}