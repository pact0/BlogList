import React, { useState } from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";

const NewBlogForm = () => {
  const dispatch = useDispatch();
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogUrl, setNewBlogUrl] = useState("");

  const handleTitleChange = (e) => {
    setNewBlogTitle(e.target.value);
  };
  const handleAuthChange = (e) => {
    setNewBlogAuthor(e.target.value);
  };
  const handleUrlChange = (e) => {
    setNewBlogUrl(e.target.value);
  };
  const handleNewBlog = async (e) => {
    e.preventDefault();
    const newBlog = {
      author: newBlogAuthor,
      title: newBlogTitle,
      url: newBlogUrl,
    };
    console.log(newBlog);
    const response = await blogService.createBlog(newBlog);
    console.log(response);
    dispatch(createBlog(newBlog));
  };
  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <h4>title</h4>
        <input
          type="text"
          onChange={handleTitleChange}
          value={newBlogTitle}
        ></input>
        <h4>author</h4>
        <input
          type="text"
          onChange={handleAuthChange}
          value={newBlogAuthor}
        ></input>
        <h4>url</h4>
        <input
          type="text"
          onChange={handleUrlChange}
          value={newBlogUrl}
        ></input>
        <button type="submit">Create new post</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
