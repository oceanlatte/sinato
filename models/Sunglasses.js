//Requirements 
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Sunglasses extends Model {}

//Define the table
Sunglasses.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id"
      }
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "post",
        key: "id"
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "sunglasses"
  }
);

module.exports = Sunglasses;