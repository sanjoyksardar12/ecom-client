import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearNotification } from "../../store/cart";
import "./toast.css";

const Toast = () => {
  const dispatch = useDispatch();
  const message = useSelector((state) => state.cart.notification);
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearNotification());
    }, 4000);
    return () => clearTimeout(timer);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (!message) {
    return null;
  }
  return <div id="toast">{message}</div>;
};

export default Toast;
