import "./Input.css"
export default function Input(){

    return (

        
        <div className="form-control text-bg-dark Search-bar d-flex flex-col mb-2" style={{border:"solid 1px rgba(135, 134, 134, 0.295)" ,display:"flex", alignItems:"center" ,justifyContent:"center"}  }>
            <i class="fa-solid fa-magnifying-glass"></i>
            <input type="text" className="w-100 text-bg-dark p-2 Search-bar"  placeholder={"Search"}/>

        </div>

        
    )

}