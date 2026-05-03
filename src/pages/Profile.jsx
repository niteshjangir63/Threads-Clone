import { useEffect, useState } from "react";
import Post from "../components/post/Post";
import ProfileTab from "../components/profile/ProfileTab";
import { useParams } from "react-router-dom";
import Loader from "../components/loader/Loader";
import toast from "react-hot-toast";
import API from "../api/axios";

export default function Profile() {
  const { username } = useParams();

  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const [msg, setMsg] = useState("");

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

  useEffect(() => {

    if (posts.length === 0){

    
    const getPosts = async () => {
      setLoadingPosts(true);

      try {
        const res = await API.get("/posts");
        setPosts(res.data.posts || []);
      } catch (e) {
        const message = e?.response?.data?.message || "Error fetching posts";
        setMsg(message);
        toast.error(message);
      } finally {
        setLoadingPosts(false);
      }
    };

    getPosts();

  }
  }, [posts.length]);

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