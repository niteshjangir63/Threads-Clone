import { useEffect, useState, useContext } from "react";
import Post from "../components/post/Post";
import ProfileTab from "../components/profile/ProfileTab";
import axios from "axios";
import { useParams } from "react-router-dom";
import Loader from "../components/loader/Loader";
import { AuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

export default function Profile() {
  const { authUser } = useContext(AuthContext);
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
  const fetchProfile = async () => {
    setLoading(true);

    try {
      let url;

      if (username) {
        url = `https://threadsclone-42y4.onrender.com/${username}`;
      } else {
        url = `https://threadsclone-42y4.onrender.com/profile`;
      }

      

      const { data } = await axios.get(url, {
        withCredentials: true,
      });

      
      setProfile(data.user);
    } catch (error) {
      
      toast.error(error?.response?.data?.message || "Profile not fetching");
    } finally {
      setLoading(false);
    }
  };

  fetchProfile();
}, [username]);


  useEffect(() => {
    const getPosts = async () => {
      setLoadingPosts(true);
      try {
        const res = await axios.get(
          "https://threadsclone-42y4.onrender.com/posts",
          { withCredentials: true }
        );

        setPosts(res.data.posts);
      } catch (e) {
        setMsg(e?.response?.data?.message || "Error fetching posts");
        toast.error(e?.response?.data?.message);
      } finally {
        setLoadingPosts(false);
      }
    };

    getPosts();
  }, []);

  
  const userPosts = posts.filter(
    (post) => post.author?._id === profile?._id
  );

  return (
    <>
      {(loadingProfile || loadingPosts) && <Loader size="lg" />}

      {profile ? (
        <>
          <ProfileTab profile={profile} />

          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <Post key={post._id} post={post} />
            ))
          ) : (
            <h5 className="text-light text-center mt-3">
              No posts yet
            </h5>
          )}
        </>
      ) : (
        !loadingProfile && (
          <h3 className="text-light">
            {msg || "Server not responding"}
          </h3>
        )
      )}
    </>
  );
}