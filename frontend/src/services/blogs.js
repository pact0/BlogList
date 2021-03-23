import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs/";

let token = null;
const setToken = (newToken) => {
  token = `${newToken}`;
};
const getAllBlogs = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

const createBlog = async (newBlog) => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(baseUrl, newBlog, config);
};

export default {
  getAllBlogs,
  createBlog,
  setToken,
};
