import { createContext, useContext, useEffect, useState } from "react";
import { socket } from "../socket";
import { fetchNotification } from "../api/notificationApi";
import { AuthContext } from "./AuthContext";

export const NotificationContext = createContext(null);

export function NotificationProvider({ children }) {
  const { authUser } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  useEffect(() => {
    const getNotifications = async () => {
      if (!authUser) return;

      const res = await fetchNotification();
      setNotifications(res?.data?.notifications || []);
    };

    getNotifications();
  }, [authUser]);

  useEffect(() => {
    const handleNotification = (data) => {
      setNotifications((prev) => [data, ...prev]);
    };

    socket.on("notification", handleNotification);

    return () => socket.off("notification", handleNotification);
  }, []);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}