import Items from "../components/items";
import { useOrderContext } from "../context/order";

function OrderPage() {
  const {
    orderDetail: { items = [] },
  } = useOrderContext();
  return <Items selectedItems={items} filter={true} />;
}

export default OrderPage;
