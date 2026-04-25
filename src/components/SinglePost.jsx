import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getPostById } from "../api/postApi";
import Post from "./post/Post";
import Loader from "./loader/Loader";
import CommentCard from "./comment/CommentCard";
import { useComments } from "../context/CommentContext";

export default function SinglePost() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const { comments } = useComments();

    const { id } = useParams();

    useEffect(() => {

        const fetchPostById = async () => {
            setLoading(true);
            try {
                const res = await getPostById(id);
                setPost(res.data.post);
            } catch (e) {
                console.log(e);
            } finally {
                setLoading(false);
            }
        };



        fetchPostById();


    }, [id]);



    const newComment = comments.filter(
        (comment) =>
            comment.postId?.toString() === post?._id?.toString()
    );

    if (loading) return <Loader />;

    return (
        <>
            <Post post={post} />

            {newComment.map((comment) => (


                <CommentCard
                    key={comment._id}
                    userId={comment.userId}
                    content={comment}
                />
            ))}
        </>
    );
}