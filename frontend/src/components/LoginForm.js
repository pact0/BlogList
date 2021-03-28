import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { setGlobalUser } from "../reducers/userReducer";
import loginService from "../services/login";
const LoginForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    // setErrorMessage("");
    e.preventDefault();
    console.log("login with ", username, password);
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
      dispatch(setGlobalUser(user));
      loginService.setToken(user.token);
      setPassword("");
      setUsername("");
    } catch (exception) {
      // setErrorMessage("Invalid credentials");
      // console.log(errorMessage);
      setTimeout(() => {
        // setErrorMessage(null);
      }, 5000);
    }
    history.push("/home");
  };
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h5>Username</h5>
        <input
          type="text"
          placeholder="username"
          value={username}
          onChange={handleUsernameChange}
        />
        <h5>Password</h5>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
