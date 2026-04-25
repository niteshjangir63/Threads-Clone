import { useState, createContext, useContext } from "react"
const PostContext = createContext();

export const PostProvider = ({ children }) => {

    const [posts, setPost] = useState([]);

    const setPosts = (posts) => setPost(posts);
    const addPost = (post) => {

        setPost((prev) => [post, ...prev]);
    };
    const removePost = (postId) => {

        setPost((prev) => prev.filter((post) => post._id !== postId))
    }

    return <PostContext.Provider

        value={{ posts, setPosts, addPost, removePost }}>
        {children}
    </PostContext.Provider>
}

export const usePosts = () => useContext(PostContext)