import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function PublicRoute({ children }) {
  const { authUser } = useContext(AuthContext);

  if (authUser) {
    return <Navigate to="/" replace />;
  }

  return children;
}