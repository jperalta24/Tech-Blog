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

router.post("/:postId", withAuth, async (req, res) => {
  try {
    console.log("Request Body: ", req.body);
    console.log("Request Params: ", req.params);
    
    const post_Id = req.params.postId;
    const user_Id = req.session.userId;
    const content = req.body.content;

    console.log("post_Id:", post_Id);
    console.log("user_Id:", user_Id);
    console.log("content:", content);

    const newComment = await Comment.create({
      content,
      userId: user_Id, // use correct key
      postId: post_Id, // use correct key
    });

    console.log("newComment:", newComment);

    res.status(200).json({ newComment, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
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
