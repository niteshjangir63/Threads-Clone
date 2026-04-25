import API from "./axios";

export const getProfile = () => {

    return API.get("/profile");
}

export const updateProfile = (form) => {

    return API.put("/profile/update",form);
}

export const updateProfileImage = (formData) => {
    return API.patch("/profile/update/avatar", formData);
};