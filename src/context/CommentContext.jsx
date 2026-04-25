import { useContext, createContext, useState } from "react";
import { getComment } from "../api/postApi";
import { useEffect } from "react";

const CommentContext = createContext();

export const CommentProvider = ({ children }) => {


    useEffect(() => {


        const fetchCommentById = async () => {
            try {
                const res = await getComment();
                console.log(res?.data?.comments)
                setComments(res?.data.comments);
            } catch (e) {
                console.log(e);
            }
        };

        fetchCommentById();
    }, [])



    const [comments, setComment] = useState([]);

    const setComments = (comment) => setComment(comment);

    const addComments = (newComment) => {
        setComment(prev => [newComment, ...prev]);
    };

    const removeComment = (id) => {

        setComment((prev) => prev.filter((comment) => comment._id !== id));
    }

    return (
        <CommentContext.Provider value={{ comments, setComments, addComments, removeComment }}>
            {children}
        </CommentContext.Provider>
    );
};

export const useComments = () => {


    return useContext(CommentContext);

}