const APP_CONSTANTS = {
  APIS: {
    BACKEND_BASE_URL: "http://localhost:4000",
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
