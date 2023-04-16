const router = require("express").Router();
const { User, Post, Comment } = require("../../models");
const withAuth = require("../../utils/auth");

//sign up a new user
//api/user
router.post("/signup", async (req, res) => {
  console.log(req.body);
  try {
    const newUser = await User.create(req.body);
    console.log(newUser);
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.email = newUser.email;
      req.session.loggedIn = true;
      res.status(200).json({ message: "new user created successfully" });
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//api/user/login
router.post("/login", async (req, res) => {
  const userData = await User.findOne({
    where: { email: req.body.email },
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
      (req.session.email = userData.email),
      (req.session.loggedIn = true);
    res.status(200).json({ message: "logged in" });
  });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})

module.exports = router;
