import { Navigate } from "react-router-dom"
import { useLocation } from "react-router-dom"
export default function OtpProtectedRoute({ children }) {

    const location = useLocation();
    let isOtp = localStorage.getItem("isOtp")
    if (!isOtp) {

        return <Navigate to="/forgot" />
    }
    return children;
}