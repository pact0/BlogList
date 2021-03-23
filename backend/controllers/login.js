const jwt = require("jsonwebtoken");
const argon2 = require("argon2");
const loginRouter = require("express").Router();
const User = require("../models/user");

loginRouter.post("/", async (request, response) => {
  const body = request.body;
  const user = await User.findOne({ username: body.username });
  const passwordCorrect =
    user === null
      ? false
      : await argon2.verify(user.passwordHash, body.password);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24,
  });

  response.status(200).send({ token, username: user.username });
});

module.exports = loginRouter;
