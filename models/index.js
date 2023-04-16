const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

User.hasMany(Post, {
  foreignKey: 'user_Id',
  onDelete: 'CASCADE'
});

Post.belongsTo(User, {
  foreignKey: "user_Id",
  onDelete: "CASCADE",
});

User.hasMany(Comment, {
  foreignKey: 'user_Id',
  onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
  foreignKey: "user_Id",
});

Post.hasMany(Comment, {
  foreignKey: "post_Id",
});

Comment.belongsTo(Post, {
  foreignKey: "post_Id",
});


module.exports = { User, Post, Comment };
