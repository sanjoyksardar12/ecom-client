import { useState } from "react";
import { useNavigate } from "react-router-dom";
import  APP_CONSTANTS from "../../constant";
import {
  useNotificationContext,
} from "../../context";
import { setCookie } from "../../utils";
import fetcher from "../../utils/fetrcher";
import "./loginForm.css";

const { NOTIFICATION_TYPES, APIS} = APP_CONSTANTS;

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { addNotification } = useNotificationContext();

  const updateUsetName = (event) => {
    setUsername(event.target.value);
  };

  const updatePassword = (event) => {
    setPassword(event.target.value);
  };

  const validate = ()=>{
    if(!username || username.length<6 || !password || password.length<6){ 
      addNotification("Minimum length of Username and Password is 6 !" , NOTIFICATION_TYPES.ERROR)
      return false
    }
    return true
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if(!validate()){
      return
    }

    const result = await fetcher.post(APIS.LOGIN, {
      username: username,
      password: password,
    });
    if (!result.success) {
      addNotification(result.message || "Invalid username/password", NOTIFICATION_TYPES.ERROR);
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
