import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils";
import "./header.css";
import {
  useCartContext,
  useNotificationContext,
  useOrderContext,
  useOrderHistoryContext,
} from "../../context";
import APP_CONSTANTS from "../../constant";
import fetcher from "../../utils/fetrcher";

function Header() {
  const navigate = useNavigate();
  const { cartDetail } = useCartContext();
  const { setOrderDetail } = useOrderContext();
  const { setOrderIds } = useOrderHistoryContext();
  const { addNotification } = useNotificationContext();
  const showCartDetail = () => {
    const cartIds = [...cartDetail?.items].join(",");
    const message = `Cart Id: ${cartDetail.cartId},  Item Ids: ${cartIds}`; // move this string
    addNotification(message);
  };

  const makeOrder = async () => {
    const result = await fetcher.get(
      APP_CONSTANTS.APIS.ORDER.replace(":cartId", cartDetail.cartId)
    );
    debugger;
    console.log("result", result);
    setOrderDetail(result);
    addNotification(result.message || "order confirm!!");

    navigate(`order/${result.orderId}`);
  };

  const showOrderHistory = async () => {
    const result = await fetcher.get(APP_CONSTANTS.APIS.ORDER_HISTORY);
    addNotification(`Order Ids=${result.orderIds.join(",")}`);
    setOrderIds(result.orderIds);
  };

  //considering if token present , that means user loggedin
  const token = getCookie("token");
  return (
    <header className="siteHeader">
      <div className="docContent">
        <div className="header-content">
          <Link to="/" className="logo-link">
            Home
          </Link>
          {token && (
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
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
