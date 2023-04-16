const router = require("express").Router();
const { Comment, Post, User } = require("../../models");
const withAuth = require("../../utils/auth");

// get all comments
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll({});
    if (commentData.length === 0) {
      res.status(404).json({ message: "No comments" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all comments from one post
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findAll({
      where: { id: req.params.id },
    });
    if (commentData.length === 0) {
      res.status(404).json({ message: "This post has no comments" });
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/:postId', withAuth, async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.session.userId;
    console.log(postId, userId);
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: userId, // Use 'user_Id' as defined in the Comment model
      post_id: postId, // Use 'post_id' as defined in the Comment model
    });

    res.status(200).json(newComment);
  } catch (err) {
    console.log(err); // Log the error
    res.status(400).json(err);
  }
});

router.delete("/", withAuth, async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: { id: req.params.id },
    });
    if (!commentData) {
      return res.status(404).json({
        message: "No comment with this id is found",
      });
    }
    res.status(200).json({ commentData, success: true });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
