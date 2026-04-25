import API from "./axios";

export const getPost = () => {

    return API.get("/posts");
}

export const getPostById = (id) => {

    return API.get(`/post/${id}`)
}
export const createPost = () => {

    return API.post("/create");
}
export const deletePost = (id) => {


    return API.delete(`/post/delete/${id}`);
}


export const likePost = (id) => {


    return API.post(`/post/like/${id}`);

}


export const handleFollow = (id) => {

    return API.post(`/follow/${id}`)

}

export const addComment = (postId, data) => {
    return API.post(`/comment/${postId}`, { content: data });
};

export const getComment = () => {
    return API.get(`/comment/get`);
};

export const deleteComment = (id) =>{

    return API.delete(`/comment/delete/${id}`);
}