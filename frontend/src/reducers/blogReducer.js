import blogService from "../services/blogs";
const initialState = [];

const blogReducer = (state = initialState, action) => {
  console.log("ACTION IN BLOGREDUCER", action);
  console.log("STATE IN BLOGREDUCER", state);
  switch (action.type) {
    case "INIT_BLOGS":
      return [...action.data];
    case "CREATE_BLOG":
      return [...state, action.data];
    case "LIKE_BLOG": {
      const blogToChange = action.data.blog;
      const id = action.data.id;
      return state.map((blog) =>
        blog.id === blogToChange.id ? blogToChange : blog
      );
    }
    case "DELETE_BLOG": {
      const blogToDelete = action.data.blog;
      const id = action.data.id;
      return state.filter((blog) => blog.id !== blogToDelete.id);
    }
    default:
      return [...state];
  }
};

export const initializeBlogs = (blogs) => {
  return {
    type: "INIT_BLOGS",
    data: blogs,
  };
};

export const createBlog = (content) => {
  return {
    type: "CREATE_BLOG",
    data: {
      content,
    },
  };
};

export const likeBlog = (blog) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs;
    const blogToChange = blogs.find((a) => a.id === blog.id);
    const changedBlog = {
      ...blogToChange,
      likes: ++blogToChange.likes,
    };
    console.log(blogs, blogToChange, changedBlog);
    const response = await blogService.likeBlog(changedBlog);
    console.log("RESPONSE", response);
    dispatch({
      type: "LIKE_BLOG",
      data: {
        blog: response,
      },
    });
  };
};

export const deleteBlog = (blog) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs;
    const blogToDelete = blogs.find((a) => a.id === blog.id);
    console.log("TO DELETE:", blogToDelete);
    const response = await blogService.deleteBlog(blogToDelete);
    dispatch({
      type: "DELETE_BLOG",
      data: {
        blog: response,
      },
    });
  };
};

export default blogReducer;
