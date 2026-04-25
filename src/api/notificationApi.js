import API from "./axios";

export const fetchNotification = () => {

    return API.get("/notification");
}


export const markNotificationRead = (id) => {
    return API.patch(`/notification/${id}/read`);
};