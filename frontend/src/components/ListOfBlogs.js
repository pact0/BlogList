import React from "react";
import { SingleBlog } from "./SingleBlog";
import { useDispatch } from "react-redux";
import { likeBlog } from "../reducers/blogReducer";
import { Button } from "@material-ui/core";
import ExposurePlus1Icon from "@material-ui/icons/ExposurePlus1";
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
const ListOfBlogs = ({ blogs }) => {
  const dispatch = useDispatch();
  const handleLikeBlog = (blog) => {
    dispatch(likeBlog(blog));
  };
  return (
    <div>
      <ThumbUpIcon />
      {blogs.map((blog) => {
        return (
          <div key={blog.id}>
            <SingleBlog blog={blog} />
            <Button onClick={() => handleLikeBlog(blog)} color="secondary">
              like
            </Button>
          </div>
        );
      })}
    </div>
  );
};

export default ListOfBlogs;
