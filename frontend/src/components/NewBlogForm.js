import React from "react";

const NewBlogForm = ({
  handleNewBlog,
  handleUrlChange,
  handleAuthChange,
  handleTitleChange,
  authorValue,
  urlValue,
  titleValue,
}) => {
  return (
    <div>
      <form onSubmit={handleNewBlog}>
        <h4>title</h4>
        <input
          type="text"
          onChange={handleTitleChange}
          value={titleValue}
        ></input>
        <h4>author</h4>
        <input
          type="text"
          onChange={handleAuthChange}
          value={authorValue}
        ></input>
        <h4>url</h4>
        <input type="text" onChange={handleUrlChange} value={urlValue}></input>
        <button type="submit">Create new post</button>
      </form>
    </div>
  );
};

export default NewBlogForm;
