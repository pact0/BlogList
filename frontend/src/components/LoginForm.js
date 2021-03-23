import React from "react";

const LoginForm = ({
  usernameValue,
  passwordValue,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
}) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <h5>Username</h5>
        <input
          type="text"
          placeholder="username"
          value={usernameValue}
          onChange={handleUsernameChange}
        />
        <h5>Password</h5>
        <input
          type="password"
          placeholder="password"
          value={passwordValue}
          onChange={handlePasswordChange}
        />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
};

export default LoginForm;
