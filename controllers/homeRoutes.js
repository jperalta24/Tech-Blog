const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/auth");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ["content"],
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn,
      // username: req.session.username,
      // userId: req.session.userId,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get a single post ('/post/:id')
router.get("/posts/:id", async (req, res) => {
  try{
  const postData = await Post.findByPk(req.params.id, {
    include: [
      {
        model: Comment,
        attributes: ['content'],
        include: {
          model: User,
          attributes: ['username'],
        },
      },
      {
        model: User,
        attributes: ['username']
      },
    ]
  });
  if (postData){
  const post = postData.map((post) => post.get({ plain: true}));
  console.log(post);
  res.render('singlePost', {
    post, loggedIn: req.session.loggedIn, username: req.session.username,
  })
} else {
  res.status(404).json({message: "This id does not have a post"})
}
} catch
  (err) {
    res.status(500).json(err);
};
});
module.exports = router;
