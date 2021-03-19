const listHelper = require("../utils/list_helper");

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  const listWithMoreThanOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f6",
      title: "Go To Statement Considered Harmfulfsdfdsdsf",
      author: "Edsger W. Dijkstrafsdfds",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Hdffdfdarmful.html",
      likes: 25,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url:
        "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper.totalLikes(listWithOneBlog);
    expect(result).toBe(5);
  });

  test("when list has more than one blog", () => {
    const result = listHelper.totalLikes(listWithMoreThanOneBlog);
    expect(result).toBe(30);
  });
});
