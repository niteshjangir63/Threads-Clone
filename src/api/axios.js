import axios from "axios";

const API = axios.create({
  baseURL: "https://threadsclone-42y4.onrender.com",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default API;