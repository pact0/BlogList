import React, { useState, useEffect } from "react";
import Blogs from "./components/Blogs";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import Notification from "./components/Notification";
import NewBlogForm from "./components/NewBlogForm";
import Button from "./components/Button";
import blogService from "./services/blogs";
import loginService from "./services/login";
import {
  Switch,
  Route,
  Link,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import BlogDirect from "./components/BlogDirect";

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

  const history = useHistory();

  useEffect(() => {
    blogService.getAllBlogs().then((blogs) => setBlogs(blogs));
    console.log(blogs);
  }, [user]);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
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
      window.localStorage.setItem("loggedUser", JSON.stringify(user));
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
    history.push("/home");
  };

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("logout");
    window.localStorage.removeItem("loggedUser");
    setUser(null);
    setBlogs([]);
    history.push("/home");
  };

  const handleNewBlog = async (newBlog) => {
    console.log("HANDLE BLOG");
    try {
      const blog = await blogService.createBlog({
        title: newBlogTitle,
        author: newBlogAuthor,
      });
      setBlogs([...blogs, blog]);
      // setSuccessMessage(`a new blog ${blog.title} by ${blog.author}`)
      console.log(blog);
      setTimeout(() => {
        // setSuccessMessage('')
      }, 3000);
    } catch (err) {
      console.log(err);
      // setErrorMessage(err.response.data.error);
      setTimeout(() => {
        setErrorMessage("");
      }, 3000);
    }
  };

  const match = useRouteMatch("/blogs/:id");
  const blog_ = match
    ? blogs.find((blog) => blog.id === Number(match.params.id))
    : null;

  return (
    <div>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/blogs">Blogs</Link>
        <Link to="/users">Users</Link>
        <Link to="/blogs/60538c4b90b3fa6662c0c61b">BEEP BOOP</Link>

        {user ? (
          <div>
            <p>{user.username}logged in</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>

      <Switch>
        <Route path="/blogs/:id">
          <BlogDirect blog_={blog_} />
        </Route>
        <Route path="/login">
          {!user && (
            <LoginForm
              usernameValue={username}
              handleUsernameChange={handleUsernameChange}
              passwordValue={password}
              handlePasswordChange={handlePasswordChange}
              handleLogin={handleLogin}
            />
          )}
        </Route>
        <Route path="/blogs">
          {user && (
            <>
              <NewBlogForm
                handleTitleChange={(e) => setNewBlogTitle(e.target.value)}
                handleAuthChange={(e) => setNewBlogAuthor(e.target.value)}
                handleUrlChange={(e) => setNewBlogUrl(e.target.value)}
                handleNewBlog={handleNewBlog}
                authorValue={newBlogAuthor}
                titleValue={newBlogTitle}
                urlValue={newBlogUrl}
              />
              <Blogs blogs={blogs} />
            </>
          )}
        </Route>
        <Route path="/users">
          <div>users</div>
        </Route>
      </Switch>

      <div>feet</div>
    </div>
  );
}

export default App;
