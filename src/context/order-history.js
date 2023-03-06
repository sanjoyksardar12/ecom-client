import { createContext, useContext, useState } from "react";

const OrderHistoryContext = createContext({
  orderIds: [],
  setOrderIds: () => {},
});

OrderHistoryContext.displayName = "OrderHistoryContext";
function OrderHistoryContextProvider({ children }) {
  const [items, setOrderIds] = useState([]);
  return (
    <OrderHistoryContext.Provider value={{ items, setOrderIds }}>
      {children}
    </OrderHistoryContext.Provider>
  );
}

const useOrderHistoryContext = () => {
  return useContext(OrderHistoryContext);
};

export {
  OrderHistoryContextProvider,
  OrderHistoryContext,
  useOrderHistoryContext,
};
