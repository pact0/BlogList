const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const helper = require("./test_helpers");
const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

describe("api tests", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200) // status code 200
      .expect("Content-type", /application\/json/);
  });

  test("all blogs are returned", async () => {
    const response = await api.get("/api/blogs");

    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test("a specific blog is within the returned blogs", async () => {
    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.title);
    expect(contents).toContain("Browser can execute only Javascript");
  });

  test("valid blog can be added", async () => {
    const newBlog = { title: "zydson", author: "to ziomal" };

    await api
      .post("/api/blogs")
      .send(newBlog)
      .expect(200)
      .expect("Content-type", /application\/json/);

    const response = await api.get("/api/blogs");

    const contents = response.body.map((r) => r.title);

    expect(response.body).toHaveLength(helper.initialBlogs.length + 1);
    expect(contents).toContain("zydson");
  });

  test("blog without title and author is not added", async () => {
    const newBlog = {
      likes: 200,
    };

    await api.post("/api/blogs").send(newBlog).expect(400);

    const re = await helper.blogsInDb();

    expect(re).toHaveLength(helper.initialBlogs.length);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
