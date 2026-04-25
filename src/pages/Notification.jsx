import { useContext } from "react";
import NotificationCard from "../components/NotificationCard/NotificationCard";
import { NotificationContext } from "../context/NotificationContext";
import { markNotificationRead } from "../api/notificationApi";
import toast from "react-hot-toast";

export default function Notification() {
  const { notifications, setNotifications } = useContext(NotificationContext);

  const handleRead = async (id) => {
    try {
      await markNotificationRead(id);

      setNotifications((prev) =>
        prev.map((n) =>
          n._id === id ? { ...n, isRead: true } : n
        )
      );
    } catch (err) {
     toast.error(e.response.data.message);
    }
  };

  
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  const isSameDay = (d1, d2) =>
    d1.toDateString() === d2.toDateString();

  const todayNotifications = notifications.filter((n) =>
    isSameDay(new Date(n.createdAt), today)
  );

  const yesterdayNotifications = notifications.filter((n) =>
    isSameDay(new Date(n.createdAt), yesterday)
  );

  const olderNotifications = notifications.filter(
    (n) =>
      !isSameDay(new Date(n.createdAt), today) &&
      !isSameDay(new Date(n.createdAt), yesterday)
  );

  return (
    <>
      {notifications.length === 0 && (
        <span style={{ color: "gray" }}>No notifications</span>
      )}

      
      {todayNotifications.length > 0 && (
        <>
          <h4 className="notification-heading">Today</h4>
          {todayNotifications.map((n) => (
            <NotificationCard key={n._id} data={n} onRead={handleRead} />
          ))}
        </>
      )}

      {/* 🔥 Yesterday */}
      {yesterdayNotifications.length > 0 && (
        <>
          <h4 className="notification-heading">Yesterday</h4>
          {yesterdayNotifications.map((n) => (
            <NotificationCard key={n._id} data={n} onRead={handleRead} />
          ))}
        </>
      )}

      {/* 🔥 Older */}
      {olderNotifications.length > 0 && (
        <>
          <h4 className="notification-heading">Earlier</h4>
          {olderNotifications.map((n) => (
            <NotificationCard key={n._id} data={n} onRead={handleRead} />
          ))}
        </>
      )}
    </>
  );
}