import API from "./axios";

export const fetchNotification = () => {

    return API.get("/notifications");
}


export const markNotificationRead = (id) => {
    return API.patch(`/notifications/${id}/read`);
};