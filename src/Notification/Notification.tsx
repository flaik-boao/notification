import React, { useEffect, useState } from "react";
import { v4 } from "uuid";
import "./Notification.scss";

export const Context = React.createContext({});

type NotificationType = "success" | "error" | "warn";

type Notification = {
  id: string;
  message: string;
  type: NotificationType;
  duration: number;
};

interface OpenConfig {
  message: string;
  type: NotificationType;
  duration: number;
}

export default function NotificationProvider({ children }: any) {
  const [notifications, setNotifications] = useState<Array<Notification>>([]);

  const open = ({ message, type = "success", duration = 5000 }: OpenConfig) => {
    setNotifications((n: any) =>
      n.length >= 10
        ? [...n.slice(-9), { id: v4(), message, type, duration }]
        : [...n, { id: v4(), message, type, duration }]
    );
  };

  const close = (id: string) => {
    setNotifications((notifications: any) =>
      notifications.filter((n: any) => n.id !== id)
    );
  };

  const closeAll = () => {
    setNotifications([]);
  };

  return (
    <Context.Provider value={{ open, close, closeAll }}>
      <div className="notification__container">
        {notifications.map((notification: Notification, index: number) => (
          <NotificationItem
            key={notification.id}
            id={notification.id}
            type={notification.type}
            styles={{ top: 50 * index }}
            duration={notification.duration}
            message={notification.message}
            handleRemove={close}
          />
        ))}
      </div>
      {children}
    </Context.Provider>
  );
}

export function NotificationItem({
  id,
  duration,
  message,
  type,
  handleRemove,
  styles,
}: Notification & { styles: any; handleRemove: (id: string) => void }) {
  const [classNames, setClassNames] = useState("");

  useEffect(() => {
    setClassNames(" mount");
    setTimeout(() => {
      setClassNames(" unmount");
      setTimeout(() => handleRemove(id), 300);
    }, duration);
    // eslint-disable-next-line
  }, []);

  const getBackgroundColor = (type: NotificationType) => {
    return {
      success: "Aquamarine",
      error: "red",
      warn: "orange",
    }[type];
  };

  return (
    <div
      className={"notification" + classNames}
      style={{ ...styles, backgroundColor: getBackgroundColor(type) }}
      onClick={() => handleRemove(id)}
    >
      {message}
    </div>
  );
}
