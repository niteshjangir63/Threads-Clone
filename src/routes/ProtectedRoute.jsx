import { Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Loader from "../components/loader/Loader";
import { toast } from "react-hot-toast";
import { useRef } from "react";

export default function ProtectedRoute({ children }) {
  const { authUser, loading } = useContext(AuthContext);
  const toastShown = useRef(false);

  useEffect(() => {
    if (!loading && !authUser && !toastShown.current) {
      toast.error("Login Please!");
      toastShown.current = true;
    }
  }, [authUser, loading]);

  if (loading) {
    return <Loader />;
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
}