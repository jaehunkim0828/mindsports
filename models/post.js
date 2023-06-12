import { Sequelize } from "sequelize";

export default class Post extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: Sequelize.STRING(128),
          allowNull: false, // null 허용
        },
        nick: {
          type: Sequelize.STRING(30),
          allowNull: false,
        },
        content: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        view: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        recommend: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        deprecated: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        img: {
          type: Sequelize.STRING(256),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: true,
        underscored: false,
        modelName: "Post",
        tableName: "posts",
        charset: "utf8",
        collate: "utf8_general_ci",
      }
    );
  }

  static associate(db) {
    db.Post.hasMany(db.Comment);
  }
}
