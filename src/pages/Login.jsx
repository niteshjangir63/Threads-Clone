import LoginTab from "../components/Login/LoginTab";
import "./Login.css"
export default function Login(){
    return(

        <>
        
        <div className="loginContainer flex-column">
            <h3 className="text-light mb-5">Login</h3>

        <LoginTab/>

        </div>

        </>
    )
}