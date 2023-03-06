import { CartContextProvider } from "./cart";
import { ItemsContextProvider } from "./items";
import { NotificationContextProvider } from "./notification";
import { OrderContextProvider } from "./order";
import { OrderHistoryContextProvider } from "./order-history";

export * from "./items";
export * from "./cart";
export * from "./order";
export * from "./order-history";
export * from "./notification";

const AppContextProvider = ({ children }) => {
  return (
    <NotificationContextProvider>
      <ItemsContextProvider>
        <CartContextProvider>
          <OrderContextProvider>
            <OrderHistoryContextProvider>
              {children}
            </OrderHistoryContextProvider>
          </OrderContextProvider>
        </CartContextProvider>
      </ItemsContextProvider>
    </NotificationContextProvider>
  );
};

export default AppContextProvider;
