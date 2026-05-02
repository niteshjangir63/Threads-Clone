// import { createContext, useEffect, useState } from "react";
// import API from "../api/axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {

//   const [authUser, setAuthUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {

//     const fetchUser = async () => {

//       try {
//         const res = await API.get("/api/me", { withCredentials: true });

//         console.log("API response:", res.data);

//         setAuthUser(res.data.user);

//       } catch (e) {
//         console.log(e);
//         setAuthUser(null);
//       } finally {
//         setLoading(false);
//       }

//     };

//     fetchUser();

//   }, []);

//   return (
//     <AuthContext.Provider value={{ authUser, setAuthUser, loading }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };





import { createContext, useEffect, useState } from "react";
import API from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setLoading(false);
          return;
        }

        const res = await API.get("/api/me"); // ❌ no withCredentials needed

        setAuthUser(res.data.user);
      } catch (e) {
        console.log(e?.response?.data || e.message);

        // ❌ invalid token → remove it
        localStorage.removeItem("token");
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