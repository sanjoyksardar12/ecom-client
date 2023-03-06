import { CartContextProvider } from "./cart";
import { ItemsContextProvider } from "./items";
import { OrderContextProvider } from "./order";

export * from "./items";
export * from "./cart";
export * from "./order";

const AppContextProvider = ({ children }) => {
  return (
    <ItemsContextProvider>
      <CartContextProvider>
        <OrderContextProvider>{children}</OrderContextProvider>
      </CartContextProvider>
    </ItemsContextProvider>
  );
};

export default AppContextProvider;
