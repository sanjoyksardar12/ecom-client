import { useEffect } from "react";
import Items from "../components/items";
import APP_CONSTANTS from "../constant";
import { useCartContext } from "../context/cart";
import { useItemsContext } from "../context/items";
import fetcher from "../utils/fetrcher";

function ListItemPage() {
  const { setItems } = useItemsContext();
  const { setCartDetail } = useCartContext();
  const { items: cartItems } = useCartContext().cartDetail || {};

  useEffect(() => {
    const getItems = async () => {
      const result = await fetcher.get(APP_CONSTANTS.APIS.ITEM_LIST);
      setItems(result.items);
    };
    getItems();
  }, [setItems]);

  const addItemToCart = (itemId) => {
    const addToCart = async () => {
      const result = await fetcher.post(APP_CONSTANTS.APIS.ADD_TO_CART, {
        items: [itemId],
      });
      setCartDetail({ items: result.items, cartId: result.cartId });
    };
    addToCart();
  };
  return (
    <Items
      addItemToCart={addItemToCart}
      selectedItems={cartItems}
      showHighlighted
    />
  );
}

export default ListItemPage;
