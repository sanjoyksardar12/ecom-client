import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Items from "../components/items";
import { useOrderContext } from "../context/order";

function OrderPage() {
  const navigate = useNavigate();
  const { items: orderItems = [] } = useOrderContext().orderDetail || {};
  useEffect(() => {
    if (!orderItems.length) {
      navigate("/");
    }
  }, [navigate, orderItems]);

  return <Items selectedItems={orderItems} filter={true} />;
}

export default OrderPage;
