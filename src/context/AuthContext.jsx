import { createContext, useEffect, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchUser = async () => {

      try {
        const res = await API.get("/api/me", { withCredentials: true });

        console.log("API response:", res.data);

        setAuthUser(res.data.user);

      } catch (e) {
        console.log(e);
        setAuthUser(null);
      } finally {
        setLoading(false);
      }

    };

    fetchUser();

  }, []);

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};