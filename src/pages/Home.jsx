import { useContext, useEffect, useState } from "react";
import Post from "../components/post/Post";
import { getPost} from "../api/postApi";
import Loader from "../components/loader/Loader";
import { usePosts } from "../context/PostContext";
import { useComments } from "../context/CommentContext";
import toast from "react-hot-toast";
import TopPost from "../components/topPostCreate.jsx/TopPost";
import { AuthContext } from "../context/AuthContext";



export default function Home() {

  const { posts, setPosts } = usePosts([]);
  const [loading, setLoading] = useState(true);
const { comments, addComment, setComments } = useComments();

const {authUser} = useContext(AuthContext);
 useEffect(() => {
  if (posts.length > 0) {
    setLoading(false);
    return;
  }

  const fetchPosts = async () => {
    try {
      const res = await getPost();
      setPosts(res?.data?.posts || []);
    } catch (e) {
      toast.error(e?.response?.data?.message || "Error fetching posts");
    } finally {
      setLoading(false);
    }
  };

  fetchPosts();
}, [posts.length, setPosts]);


  



  if (loading) {
    return <Loader size="lg" />;
  }

  if (!posts.length) {
    return <p className="text-secondary text-center mt-4">No posts yet</p>;
  }

  return (
    <>
     {authUser &&  <TopPost/> }
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
}