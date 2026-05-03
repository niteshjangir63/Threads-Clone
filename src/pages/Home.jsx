import { useContext, useEffect, useState } from "react";
import Post from "../components/post/Post";
import { getPost} from "../api/postApi";
import Loader from "../components/loader/Loader";
import { usePosts } from "../context/PostContext";
import { useComments } from "../context/CommentContext";
import toast from "react-hot-toast";




export default function Home() {

  const { posts, setPosts } = usePosts([]);
  const [loading, setLoading] = useState(true);
const { comments, addComment, setComments } = useComments();

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
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </>
  );
}