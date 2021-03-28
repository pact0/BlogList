import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { SingleBlog } from "./SingleBlog";
import NewBlogForm from "./NewBlogForm";
import { deleteBlog } from "../reducers/blogReducer";

const UserBlogs = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const blogs = useSelector((state) => state.blogs);
  const userBlogs = blogs.filter((blog) => {
    if (blog.user === user.id) return blog;
  });
  console.log(userBlogs);
  const handleDeleteBlog = (blog) => {
    dispatch(deleteBlog(blog));
  };

  return (
    <div>
      <NewBlogForm />

      {userBlogs.map((blog) => {
        return (
          <>
            <Link to={`/blogs/${blog.id}`}>
              <SingleBlog blog={blog} />
              <button onClick={() => handleDeleteBlog(blog)}>DELETE ME</button>
            </Link>
          </>
        );
      })}
    </div>
  );
};

export default UserBlogs;
