import React from "react";

export const SingleBlog = ({ blog }) => {
  return (
    <div>
      <h2>{blog.author}</h2>
      <h4>{blog.title}</h4>
      <p>likes: {blog.likes}</p>
    </div>
  );
};

export default SingleBlog;
