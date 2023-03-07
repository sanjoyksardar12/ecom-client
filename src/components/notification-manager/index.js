import { useNotificationContext } from "../../context/notification";
import Toast from "../toast";

// for simplicity showing one notification at a time
// actually should show all the notification together
function NotificationManager() {
  const { notifications } = useNotificationContext();
  if (!notifications.length) {
    return null;
  }
  const notification = notifications[0];
  return <Toast {...notification} />;
}

export default NotificationManager;
