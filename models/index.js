// import all models
const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Post, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

User.hasMany(Comment, {
    onDelete: 'CASCADE',
    foreignKey: 'user_id'
});

Post.hasMany(Comment, {
    onDelete: 'CASCADE',
    foreignKey: 'post_id'
});



module.exports = { User, Post, Comment };
  