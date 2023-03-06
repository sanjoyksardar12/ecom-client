import React from "react";
import {
  Route,
  createRoutesFromElements,
  createBrowserRouter,
} from "react-router-dom";
import LoginPage from "./pages/login";
import ListItemPage from "./pages/listItems";
import OrderPage from "./pages/order";
import CartPage from "./pages/cart";
import Layout from "./components/layout/layout";

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

function OrderHistoryPage() {
  return (
    <div>
      <div>Order History page</div>
    </div>
  );
}

export default router;
