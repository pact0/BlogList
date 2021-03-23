const usersRouter = require("express").Router();
const User = require("../models/user");
const argon2 = require("argon2");

usersRouter.get("/", async (request, response) => {
  const user = await User.find({}).populate("blogs", {
    title: 1,
    author: 1,
    likes: 1,
    url: 1,
  });
  response.json(user);
});

usersRouter.post("/", async (request, response) => {
  const body = request.body;

  const passwordHash = await argon2.hash(body.password);
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();
  response.json(savedUser);
});

module.exports = usersRouter;
