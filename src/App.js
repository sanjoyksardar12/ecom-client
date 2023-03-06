import React from "react";
import {
  Link,
  Route,
  Outlet,
  createRoutesFromElements,
  createBrowserRouter,
  useNavigate,
} from "react-router-dom";
import LoginPage from "./pages/login";
import ListItemPage from "./pages/listItems";
import OrderPage from "./pages/order";
import CartPage from "./pages/cart";
import { setNotification } from "./store/cart";
import { useDispatch, useSelector } from "react-redux";
import Toast from "./components/toast";
import { getCookie } from "./utils";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<LoginPage />} />
      <Route path="listitem" element={<ListItemPage />} />
      <Route path="cart" element={<CartPage />} />
      <Route path="order/:orderId" element={<OrderPage />} />
      <Route path="order-history" element={<OrderHistoryPage />} />
    </Route>
  )
);
function App() {
  return (
    <div>
      <div>Ecommerce</div>
    </div>
  );
}

function OrderHistoryPage() {
  return (
    <div>
      <div>Order History page</div>
    </div>
  );
}

function Layout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, cartId } = useSelector((state) => state.cart);
  const showCartDetail = () => {
    const cartIds = items
      .filter((item) => item.inCart)
      .map(({ id }) => id)
      .join(",");

    const message = `cartId: ${cartId} \n Item Ids: ${cartIds}`;
    dispatch(setNotification(message));
  };

  const makeOrder = () => {
    var myHeaders = new Headers();
    myHeaders.append("x-access-token", getCookie("token"));
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Cookie", document.cookie);

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    // replace cart id
    fetch("http://localhost:4000/cart/0/complete", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        navigate(`order/${result.orderId}`);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <header>
        <ul>
          <li key="home">
            <Link to="/">Home</Link>
          </li>
          <li key="checkout">
            <button onClick={makeOrder}>checkout</button>
          </li>

          <li key="cart">
            <button onClick={showCartDetail}>Cart</button>
          </li>

          <li key="order-history">
            <Link to="/order-history">Order history</Link>
          </li>
        </ul>
      </header>
      <Outlet />
      <Toast />
    </div>
  );
}

export default App;
export { router };
