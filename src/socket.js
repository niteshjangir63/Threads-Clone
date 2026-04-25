import { io } from "socket.io-client";

export const socket = io("https://threadsclone-42y4.onrender.com", {
  withCredentials: true
});