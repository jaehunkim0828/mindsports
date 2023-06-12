import Post from "./post.js";
import Comment from "./comment.js";
import Sequelize from "sequelize";

const json = {
  development: {
    username: "root",
    password: "gkfajsl132!",
    database: "bock",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "gkfajsl132!",
    database: "bock",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

const config = json[process.env.NODE_ENV || "development"];

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
