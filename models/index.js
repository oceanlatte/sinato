//Import Models

//const User = require("./User");
const Post = require("./Post");
const User = require("./User");
const Thumbs = require("./Thumbs");
const Comment = require("./Comment");

//TODO: Review associations for delete functionality- There is an issue with 1:N / M:M associations and deleting

//Associations

User.hasMany(Post, {
    foreignKey: "user_id"
  });
  
  Post.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "SET NULL"
  });
  
  User.belongsToMany(Post, {
    through: Thumbs,
    as: "thumbs_posts",
  
    foreignKey: "user_id",
    onDelete: "SET NULL"
  });
  
  Post.belongsToMany(User, {
    through: Thumbs,
    as: "thumbs_posts",
    foreignKey: "post_id",
    onDelete: "SET NULL"
  });
  
//  TODO:  Review associations 
  Thumbs.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "SET NULL"
  });
  
  Thumbs.belongsTo(Post, {
    foreignKey: "post_id",
    onDelete: "SET NULL"
  });
  
  User.hasMany(Thumbs, {
    foreignKey: "user_id"
  });
  
  Post.hasMany(Thumbs, {
    foreignKey: "post_id"
  });
  
  Comment.belongsTo(User, {
    foreignKey: "user_id",
    onDelete: "SET NULL"
  });
  
  Comment.belongsTo(Post, {
    foreignKey: "post_id",
    onDelete: "SET NULL"
  });
  
  User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "SET NULL"
  });
  
  Post.hasMany(Comment, {
    foreignKey: "post_id"
  });
  
  module.exports = { User, Post, Thumbs, Comment };