const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//sign up a new user

router.post("/", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;
      res.status(200).json({ message: "new user created successfully" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const userData = await User.findOne({
    where: { username: req.body.username },
  });
  if (!userData) {
    res.status(404).json({ message: "invalid username" });
    return;
  }
  const passwordData = await userData.checkPassword(req.body.password);
  if (!passwordData) {
    res.status(404).json({ message: "invalid password" });
    return;
  }
  req.session.save(() => {
    (req.session.userId = userData.id),
      (req.session.username = userData.username),
      (req.session.loggedIn = true);
    res.status(200).json({ message: "logged in" });
  });
});

router.post("/logout", withAuth, async (req, res) => {
  try {
    if (req.session.loggedIn) {
      const userData = await req.session.destroy(() => {
        res.status(404).end();
      });
    }
  } catch (err) {
    res.status(400).end();
  }
});

module.exports = router;
