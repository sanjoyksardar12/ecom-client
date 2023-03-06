import Items from "../components/items";
import { useOrderContext } from "../context/order";

function OrderPage() {
  const { items: orderItems } = useOrderContext().orderDetail || {};

  return <Items selectedItems={orderItems} filter={true} />;
}

export default OrderPage;
