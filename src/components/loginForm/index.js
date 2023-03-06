import { useState } from "react";
import { useNavigate } from "react-router-dom";
import APP_CONSTANTS from "../../constant";
import {
  useCartContext,
  useNotificationContext,
  useOrderContext,
} from "../../context";
import { setCookie } from "../../utils";
import fetcher from "../../utils/fetrcher";
import "./loginForm.css";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setCartDetail } = useCartContext();
  const { setOrderDetail } = useOrderContext();
  const { addNotification } = useNotificationContext();

  const updateUsetName = (event) => {
    setUsername(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const result = await fetcher.post(APP_CONSTANTS.APIS.LOGIN, {
      username: username,
      password: password,
    });

    if (!result.success) {
      addNotification(result.message || "Invalid username/password");
      return;
    }
    setCookie("token", result.token);

    navigate("listitem");
  };

  return (
    <div className="login-form-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="title">Signup / Login</h3>
        <div className="input-container">
          <label className="label">Username</label>
          <input
            name="username"
            type="text"
            value={username}
            required
            autoComplete="off"
            onChange={updateUsetName}
          />
        </div>

        <div className="input-container">
          <label className="label">Password</label>
          <input
            name="password"
            type="password"
            value={password}
            required
            onChange={updatePassword}
            autoComplete="off"
          />
        </div>

        <div className="button-container">
          <input type="submit" className="submit-button" />
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
