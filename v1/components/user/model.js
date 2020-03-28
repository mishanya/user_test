const config = require("config");
const Sequelize = require("sequelize");
const models = require(process.cwd() + "/models/index");

class User extends  Sequelize.Model {

  static init(sequelize, DataTypes) {
    return super.init(
      {
        first_name: {
          type: DataTypes.STRING
        },
        last_name: {
          type: DataTypes.STRING
        },
        email: {
          type: DataTypes.STRING
        },
        avatar: {
          type: DataTypes.TEXT
        }
      },
      {
        modelName: "User",
        sequelize
      }
    )
  }
  
}

module.exports = User;
