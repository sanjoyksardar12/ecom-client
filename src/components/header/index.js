import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { setNotification } from "../../store/cart";
import { useDispatch } from "react-redux";
import { getCookie } from "../../utils";
import "./header.css";
import { useCartContext, useOrderContext } from "../../context";
import APP_CONSTANTS from "../../constant";
import fetcher from "../../utils/fetrcher";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartDetail } = useCartContext();
  const { setOrderDetail } = useOrderContext();
  const showCartDetail = () => {
    const cartIds = [...cartDetail?.items].join(",");

    const message = `Cart Id: ${cartDetail.cartId},  Item Ids: ${cartIds}`; // move this string
    dispatch(setNotification(message));
  };

  const makeOrder = async () => {
    const result = await fetcher.get(
      APP_CONSTANTS.API_ENDPOINTS.ORDER.replace(":cartId", cartDetail.cartId)
    );

    setOrderDetail(result);
    navigate(`order/${result.orderId}`);
  };

  const token = getCookie("token");
  if (!token) {
    return null;
  }

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
                  <Link to="/order-history">Order history</Link>
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
