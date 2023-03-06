import { createContext, useContext, useState } from "react";

const OrderContext = createContext({
  orderDetail: {},
  setOrderDetail: () => {},
});

OrderContext.displayName = "OrderContext";
function OrderContextProvider({ children }) {
  const [orderDetail, setOrderDetail] = useState({});
  return (
    <OrderContext.Provider value={{ orderDetail, setOrderDetail }}>
      {children}
    </OrderContext.Provider>
  );
}

const useOrderContext = () => {
  return useContext(OrderContext);
};

export { OrderContextProvider, OrderContext, useOrderContext };
