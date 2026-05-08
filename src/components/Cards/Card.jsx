import { Link } from "react-router-dom";
import { useTheme } from "../../context/Appearance";
import "./Card.css";

export default function Card({ user, content }) {

  const { theme } = useTheme();

  return (
    <Link
      to={`/profile/${user?.username}`}
      className={`thread-card text-decoration-none mt-1 ${
        theme ? "light-card" : "dark-card"
      }`}
    >

      <img
        src={user?.profile || "/default-avatar.png"}
        alt={user?.username}
        className="thread-avatar"
      />

      <div className="thread-content">

        <span className="thread-username d-flex">
          {user?.username}
        </span>

        <span className="thread-text">
          {content || user?.name}
        </span>

      </div>

    </Link>
  );
}