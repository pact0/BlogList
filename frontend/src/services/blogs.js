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
  console.log("request data:", request.data);
  return request.data;
};

export default {
  getAllBlogs,
  createBlog,
  setToken,
};
