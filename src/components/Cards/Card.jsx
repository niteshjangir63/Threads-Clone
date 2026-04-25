import { Link } from "react-router-dom"
import "./Card.css"

export default function Card({ user,content}) {

 
  
  return (

    <Link to={`/profile/${user.username}`} className="thread-card text-decoration-none">

      <img
        src={user.profile}
        alt={user.profile}
        className="thread-avatar"
      />

      <div className="thread-content">
        <span className="thread-username">{user.username}</span>
        <span className="thread-text">{content || "started following you"}</span>
      </div>

    </Link>

  )
} 