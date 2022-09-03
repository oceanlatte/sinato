//Requirements 
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//create the Post Model
class Post extends Model {
    static vote(body, models) {
      return models.Vote.create({
        user_id: body.user_id,
        post_id: body.post_id
      }).then(() => {
        return Post.findOne({
          where: {
            id: body.post_id
          },
          attributes: [
            "id",
            "post_content",
            "title",
            "created_at",
            //the vote tally
            [sequelize.literal("(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)"), "vote_count"]
          ],
          include: [
            {
              model: models.Comment,
              attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
              include: {
                model: models.User,
                attributes: ["username"]
              }
            }
          ]
        });
      });
    }
  }
  
  //Define the table
  Post.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      post_content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "user",
          key: "id"
        }
      }
    },
    {
      sequelize,
      freezeTableName: true,
      underscored: true,
      modelName: "post"
    }
  );
  
  module.exports = Post;
  

