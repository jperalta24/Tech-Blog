const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");
//All user posts ('/dashboard')

router.get("/", async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.userId);
    // Fetch all posts for the logged-in user
    const postData = await Post.findAll({
      where: { user_id: req.session.userId },
      include: [{ model: User, attributes: ["username"] }],
    });

    // Serialize the data
    const posts = postData.map((post) => post.get({ plain: true }));

    // Render the dashboard template with the serialized data and session status
    res.render("dashboard", { posts, loggedIn: req.session.loggedIn, username: userData.username });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get one post to edit ('dashboard/edit/:id')
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    // Fetch the post to be edited
    const postData = await Post.findOne({
      where: { id: req.params.id, userId: req.session.userId },
      include: [{ model: User, attributes: ["username"] }],
    });

    // If the post does not exist, return a 404 error
    if (!postData) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    // Serialize the data
    const post = postData.get({ plain: true });

    // Render the edit-post template with the serialized data and session status
    res.render("editPost", { post, loggedIn: true });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});



module.exports = router;
