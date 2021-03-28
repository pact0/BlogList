import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const getConfig = (config) => {
  const defaultConfig = {
    headers: { Authorization: token },
  };

  return {
    ...defaultConfig,
    ...config,
  };
};

const getAllBlogs = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const createBlog = async (newBlog) => {
  const request = await axios.post(baseUrl, newBlog, getConfig());
  return request.data;
};

const likeBlog = async (blog) => {
  const request = await axios.put(`${baseUrl}/${blog.id}`);
  console.log(request.data);
  return request.data;
};

const deleteBlog = async (blog) => {
  const request = await axios.delete(`${baseUrl}/${blog.id}`, getConfig());
  console.log("request data:", request.data);
  return request.data;
};

export default {
  getAllBlogs,
  createBlog,
  setToken,
  likeBlog,
  deleteBlog,
};
