import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import {
  useCartContext,
  useNotificationContext,
  useOrderContext,
  useOrderHistoryContext,
} from "../../context";
import APP_CONSTANTS from "../../constant";
import fetcher from "../../utils/fetrcher";
import { isAuthenticated } from "../../utils/authentication";

const { NOTIFICATION_TYPES, APIS} = APP_CONSTANTS;

function Header() {
  const navigate = useNavigate();
  const { cartDetail, setCartDetail } = useCartContext();
  const { setOrderDetail } = useOrderContext();
  const { setOrderIds } = useOrderHistoryContext();
  const { addNotification } = useNotificationContext();

  const showCartDetail = () => {
    if(!isAuthenticated()){
      addNotification("Please login for detail view!!", NOTIFICATION_TYPES.ERROR)
      navigate("/")
      return
    }
    if(!cartDetail?.items?.length){
      addNotification("No items in the cart!", NOTIFICATION_TYPES.ERROR)
      return
    }
    const cartIds = [...cartDetail?.items].join(",");
    const message = `Cart Id: ${cartDetail.cartId},  Item Ids: ${cartIds}`; // move this string
    addNotification(message);
  };

  const makeOrder = async () => {
    if(!isAuthenticated()){
      addNotification("Please login for detail view!!", NOTIFICATION_TYPES.ERROR)
      navigate("/")
      return
    }
    if(!cartDetail.cartId){
      addNotification("Add Items to cart!", NOTIFICATION_TYPES.ERROR)
      navigate("listitem")
      return
    }
    const result = await fetcher.get(
      APIS.ORDER.replace(":cartId", cartDetail.cartId)
    );
    setCartDetail({})
    setOrderDetail(result);
    addNotification(result.message || "order confirm!!");

    navigate(`order/${result.orderId}`);
  };

  const showOrderHistory = async () => {
    if(!isAuthenticated()){
      addNotification("Please login for detail view!!", NOTIFICATION_TYPES.ERROR)
      navigate("/")
      return
    }
    const result = await fetcher.get(APIS.ORDER_HISTORY);
    if(!result?.orderIds?.length){
      addNotification(`Order list is empty!`, NOTIFICATION_TYPES.ERROR);
      return
    }
    addNotification(`Order Ids=${result.orderIds.join(",")}`);
    setOrderIds(result.orderIds);
  };

  return (
    <header className="siteHeader">
      <div className="docContent">
        <div className="header-content">
          <Link to="/" className="logo-link">
            Home
          </Link>
            <nav className="siteNav">
              <div className="navPanel">
                <ul className="nav-list">
                  <li key="checkout">
                    <button onClick={makeOrder}>Checkout</button>
                  </li>

                  <li key="cart">
                    <button onClick={showCartDetail}>Cart</button>
                  </li>

                  <li key="order-history">
                    <button onClick={showOrderHistory}>Order history</button>
                  </li>
                </ul>
              </div>
            </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
