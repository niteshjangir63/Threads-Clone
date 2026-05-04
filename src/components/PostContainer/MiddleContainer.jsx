import "./MiddleContainer.css";
import { Outlet, useLocation } from "react-router-dom";

export default function MiddleContainer() {
  const { pathname } = useLocation();

  const routes = [
    { path: "/", label: "Home" },
    { path: "/profile", label: "Profile" },
    { path: "/search", label: "Search" },
    { path: "/notification", label: "Notification" },
    { path: "/pin", label: "Pin" },
    { path: "/update", label: "Edit Profile" },
  ];

  const match = routes.find((r) =>
    r.path === "/" ? pathname === "/" : pathname.startsWith(r.path)
  );

  const title = match?.label || "";

  return (
    <>
      <span style={{ color: "white", position: "relative", top: "10px" }}>
        {title}
      </span>

      <div className="container middleContainer mt-5 p-3">
        <Outlet />
      </div>
    </>
  );
}