//Requirements 
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

//create the Post Model
class Post extends Model {
    static thumbs(body, models) {
      return models.Thumbs.create({
        user_id: body.user_id,
        post_id: body.post_id
      }).then(() => {
        return Post.findOne({
          where: {
            id: body.post_id
          },
          attributes: [
            "id",
            "title",
            "artist",
            "post_content",
            "created_at",
            //the thumbs tally
            [sequelize.literal("(SELECT COUNT(*) FROM thumbs WHERE post.id = thumbs.post_id)"), "thumbs_count"]
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
      artist: {
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