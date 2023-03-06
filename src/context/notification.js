import { createContext, useContext, useState } from "react";
import APP_CONSTANTS from "../constant";

const NotificationContext = createContext({
  orderIds: [],
  setOrderIds: () => {},
});

NotificationContext.displayName = "NotificationContext";
function NotificationContextProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (
    notification,
    type = APP_CONSTANTS.NOTIFICATION_TYPES.INFO
  ) => {
    setNotifications([
      ...notifications,
      {
        message: notification,
        id: Date.now(),
        type,
      },
    ]);
  };
  const removeNotification = (notificationId) => {
    const index = notifications.findIndex(({ id }) => id === notificationId);
    setNotifications([
      ...notifications.slice(0, index),
      ...notifications.slice(index + 1),
    ]);
  };
  return (
    <NotificationContext.Provider
      value={{ notifications, removeNotification, addNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

const useNotificationContext = () => {
  return useContext(NotificationContext);
};

export {
  NotificationContextProvider,
  NotificationContext,
  useNotificationContext,
};
