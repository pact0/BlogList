import React from "react";

const Navbar = ({ user }) => {
  return <div className="navbar">{user && user.username}</div>;
};

export default Navbar;
