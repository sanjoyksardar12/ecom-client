import { createContext, useContext, useState } from "react";

const ItemsContext = createContext({
  items: [],
  setItems: () => {},
});

ItemsContext.displayName = "ItemsContext";
function ItemsContextProvider({ children }) {
  const [items, setItems] = useState([]);
  return (
    <ItemsContext.Provider value={{ items, setItems }}>
      {children}
    </ItemsContext.Provider>
  );
}

const useItemsContext = () => {
  return useContext(ItemsContext);
};

export { ItemsContextProvider, ItemsContext, useItemsContext };
