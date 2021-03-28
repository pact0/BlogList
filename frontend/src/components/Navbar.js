import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { setGlobalUser } from "../reducers/userReducer";
import {
  AppBar,
  Breadcrumbs,
  IconButton,
  useScrollTrigger,
} from "@material-ui/core";
import { Slide } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
const Navbar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = (e) => {
    e.preventDefault();
    console.log("logout");
    window.localStorage.removeItem("loggedUser");
    dispatch(setGlobalUser(null));
    console.log(user);
    history.push("/home");
  };
  function HideOnScroll(props) {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    );
  }

  return (
    <div>
      <HideOnScroll>
        <AppBar position="fixed">
          <Breadcrumbs aria-label="breadcrumb" separator="›">
            <Link to="/home">Home</Link>
            <Link to="/blogs">Blogs</Link>
            <Link to="/users">Users</Link>
          </Breadcrumbs>

          {user ? (
            <div>
              <p>{user.username} logged in</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </AppBar>
      </HideOnScroll>
    </div>
  );
};

export default Navbar;
