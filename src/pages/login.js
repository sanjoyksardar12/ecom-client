import { useEffect } from "react";
import LoginForm from "../components/loginForm";
import { useCartContext, useOrderContext } from "../context";
import { setCookie } from "../utils";

function LoginPage() {
  const { setOrderDetail } = useOrderContext();
  const { setCartDetail } = useCartContext();
  useEffect(() => {
    setCartDetail({});
    setOrderDetail({});
    setCookie("token", "");
  }, [setCartDetail, setOrderDetail]);
  return <LoginForm />;
}

export default LoginPage;
