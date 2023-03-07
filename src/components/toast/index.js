import { useEffect } from "react";
import APP_CONSTANTS from "../../constant";
import { useNotificationContext } from "../../context/notification";
import "./toast.css";

const { NOTIFICATION_TYPES} = APP_CONSTANTS;

const Toast = ({ message, id, type=NOTIFICATION_TYPES.INFO }) => {
  const { removeNotification } = useNotificationContext();
  useEffect(() => {
    let timer = setTimeout(() => {
      removeNotification(id);
    }, 2000);

    return () => clearTimeout(timer);
  }, [id, removeNotification]);
  const typeClass =
    type === NOTIFICATION_TYPES.INFO ? "info" : "error";
  console.log("meddage", message);
  return <div className={`toast ${typeClass}`}>{message}</div>;
};

export default Toast;
