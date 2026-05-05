import { useContext, useEffect, useState } from "react";
import Post from "../components/post/Post";
import ProfileTab from "../components/profile/ProfileTab";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/loader/Loader";
import toast from "react-hot-toast";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import "./Profile.css"
import { usePosts } from "../context/PostContext";

export default function Profile() {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const { posts, setPosts } = usePosts([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [msg, setMsg] = useState("");

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { authUser, setAuthUser } = useContext(AuthContext)
  useEffect(() => {
    const fetchProfile = async () => {
      setLoadingProfile(true);

      try {
        const url = username ? `/profile/${username}` : "/profile";

        const { data } = await API.get(url);
        setProfile(data.user);
      } catch (error) {
        const message =
          error?.response?.data?.message || "Profile not fetching";
        setMsg(message);
        toast.error(message);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, [username]);


  const userPosts = posts.filter(
    (post) => post.author?._id === profile?._id
  );


  async function logout() {

    setLoading(true);
    try {

      const res = await API.post("/logout")
      localStorage.clear();
      toast.success(res.data.message);


      if (res.data.success) navigate("/login")
    }
    catch (e) {

      toast.error(e.response.data.message)

    }
    finally {

      setLoading(false)
      setAuthUser(null);
    }

  }

  return (
    <>


      {authUser?._id === profile?._id && (
        <div
          className="dropdown d-flex ms-auto"
          id="settingBtn"
          title="More"
        >
          <button
            className="btn text-light border-0"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i className="fa-solid fa-gear"></i>
          </button>

          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
            <li>
              <button className="dropdown-item logout-btn" onClick={logout}>
                <i className="fa-solid fa-right-from-bracket"></i> Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      {(loadingProfile || loadingPosts) && <Loader size="lg" />}

      {profile ? (
        <>
          <ProfileTab profile={profile} />

          {userPosts.length > 0 ? (
            userPosts.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <h5 className="text-light text-center mt-3">No posts yet</h5>
          )}
        </>
      ) : (
        !loadingProfile && (
          <h3 className="text-light">{msg || "Server not responding"}</h3>
        )
      )}
    </>
  );
}