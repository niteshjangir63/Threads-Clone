import axios from "axios";

const API = axios.create({
  baseURL: "https://threadsclone-42y4.onrender.com",
  withCredentials: true,
});

export default API;