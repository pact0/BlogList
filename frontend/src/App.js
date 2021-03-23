import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setblogs] = useState([]);

  useEffect(() => {
    blogService.getAllBlogs().then((blogs) => setblogs(blogs));
    console.log(blogs);
  }, []);

  const handleUsernameChange = (e) => {
    console.log(e.target.value);
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    console.log(e.target.value);
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    setErrorMessage("");
    e.preventDefault();
    console.log("login with ", username, password);
    try {
      const user = await loginService.login({
        username: username,
        password: password,
      });
      setUser(user);
      loginService.setToken(user.token);
      setPassword("");
      setUsername("");
    } catch (exception) {
      setErrorMessage("Invalid credentials");
      console.log(errorMessage);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  return (
    <div className="app">
      <Navbar user={user} />
      <Notification message={errorMessage} />
      {!user && (
        <LoginForm
          usernameValue={username}
          handleUsernameChange={handleUsernameChange}
          passwordValue={password}
          handlePasswordChange={handlePasswordChange}
          handleLogin={handleLogin}
        />
      )}
      {user && <Blogs blogs={blogs} />}
    </div>
  );
}

export default App;
