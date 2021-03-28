import React from "react";

const BlogDirect = ({ blog }) => {
  if (!blog) return null;
  return (
    <div>
      <p>Author: {blog.author}</p>
      <p>Title: {blog.title} </p>
      Url: {blog.url}
    </div>
  );
};

export default BlogDirect;
