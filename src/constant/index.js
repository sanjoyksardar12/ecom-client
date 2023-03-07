const APP_CONSTANTS = {
  APIS: {
    BACKEND_BASE_URL: "https://ecom-server-assignment.vercel.app/api",
    ITEM_LIST: "/item/list",
    ADD_TO_CART: "/cart/add",
    ORDER: "/cart/:cartId/complete",
    LOGIN: "/user/login",
    ORDER_HISTORY: "/order/list",
  },
  NOTIFICATION_TYPES: {
    INFO: "Notification.Info",
    ERROR: "Notification.Error",
  },
};
export default APP_CONSTANTS;
