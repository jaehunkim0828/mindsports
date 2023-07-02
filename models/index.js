import Post from "./post.js";
import Comment from "./comment.js";
import Sequelize from "sequelize";
import dovenv from "dotenv";
dovenv.config();

const json = {
  development: {
    username: "root",
    password: "gkfajsl132!",
    database: "bock",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    dialect: "mysql",
  },
};

const config = json["production"];

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

db.sequelize = Sequelize;
db.Post = Post;
db.Comment = Comment;

Post.init(sequelize);
Comment.init(sequelize);

Post.associate(db);
Comment.associate(db);

export default sequelize;
