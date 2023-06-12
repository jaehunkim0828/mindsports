import express from "express";
import postRouter from "./post.js";
import commentRouter from "./comment.js";

const rootRouter = express.Router();

rootRouter.use("/post", postRouter);
rootRouter.use("/comment", commentRouter);

export default rootRouter;
