import React from "react";
import { Blog } from "./Blog";

const Blogs = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <Blog blog={blog} />
          </div>
        );
      })}
    </div>
  );
};

export default Blogs;
