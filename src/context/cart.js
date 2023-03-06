import { createContext, useContext, useState } from "react";

const CartContext = createContext({
  cartDetail: {},
  setCartDetail: () => {},
});

CartContext.displayName = "CartContext";
function CartContextProvider({ children }) {
  const [cartDetail, setCartDetail] = useState({});
  return (
    <CartContext.Provider value={{ cartDetail, setCartDetail }}>
      {children}
    </CartContext.Provider>
  );
}

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartContextProvider, CartContext, useCartContext };
