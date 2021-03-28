import React, { useState, useEffect } from "react";
import ListOfBlogs from "./components/ListOfBlogs";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";
import NewBlogForm from "./components/NewBlogForm";
import blogService from "./services/blogs";
import { Switch, Route, useHistory, useRouteMatch } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import BlogDirect from "./components/BlogDirect";
import { initializeBlogs, likeBlog } from "./reducers/blogReducer";
import { setGlobalUser } from "./reducers/userReducer";
import UserBlogs from "./components/UserBlogs";
import { Container } from "@material-ui/core";
import { Typography } from "@material-ui/core";

function App() {
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");

  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    blogService.getAllBlogs().then((blogs) => {
      dispatch(initializeBlogs(blogs));
    });

    const loggedUser = window.localStorage.getItem("loggedUser");
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setGlobalUser(user));
      blogService.setToken(user.token);
    } else {
      dispatch(setGlobalUser(null));
    }
  }, [dispatch]);

  const match = useRouteMatch("/blogs/:id");
  const blog = match ? blogs.find((blog) => blog.id === match.params.id) : null;
  return (
    <div>
      <Container maxWidth="sm">
        <Navbar />
        <Switch>
          <Route path="/blogs/:id">
            <BlogDirect blog={blog} />
          </Route>
          <Route path="/login">{!user && <LoginForm />}</Route>
          <Route path="/blogs">
            {user && (
              <>
                <ListOfBlogs blogs={blogs} />
              </>
            )}
          </Route>
          <Route path="/users">{user && <UserBlogs />}</Route>
        </Switch>
        <div>feet</div>
        />
      </Container>
    </div>
  );
}

export default App;
