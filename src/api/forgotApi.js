import API from "./axios";

export const sendOtp = (form) => {


    return API.post("/send-otp", form);
}
export const verifyOtp = (form) => {


    return API.post("/verify-otp", form);
}

export const updatePassword = (form) => {

    return API.put("/update-password", form);
}