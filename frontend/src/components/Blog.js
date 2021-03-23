import React from "react";

export const Blog = ({ blog }) => {
  return (
    <div>
      <h2>{blog.author}</h2>
      <h4>{blog.title}</h4>
      <p>{blog.likes}</p>
    </div>
  );
};
