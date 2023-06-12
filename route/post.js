import express from "express";
import Post from "../models/post.js";
import Comment from "../models/comment.js";

const postRouter = express.Router();

postRouter
  .route("/")
  /**게시글 리스트 불러오기 */
  .get(async (req, res, next) => {
    const { type } = req.query;

    let order;
    if (type === "best") {
      order = [["view", "DESC"]];
    } else {
      order = [];
    }

    try {
      const result = await Post.findAll({
        attributes: ["id", "title", "view", "recommend"],
        order,
      });
      res.status(200).json({
        ok: true,
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        ok: false,
        msg: "게시글 불러오기 실패",
      });
    }
  })
  /**게시글 생성 */
  .post(async (req, res, next) => {
    const { title, nick, content, img } = req.body;
    try {
      const result = await Post.create({
        title,
        nick,
        content,
        view: 0,
        recommend: 0,
        deprecated: 0,
        img,
      });

      res.status(200).json({
        ok: true,
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        ok: false,
        msg: "게시글 만들기 실패",
      });
    }
  });

/**특정 게시글 불러오기 */
postRouter
  .route("/id")
  .get(async (req, res, next) => {
    const { id } = req.query;

    try {
      const result = await Post.findOne({
        where: {
          id,
        },
      });

      res.status(200).json({
        ok: true,
        data: result,
      });
    } catch (err) {
      res.status(400).json({
        ok: false,
        msg: "댓글 달기 실패",
      });
    }
  })
  .put(async (req, res, next) => {
    const id = req.query.id;

    try {
      await Post.update(req.body, {
        where: {
          id,
        },
      });
      res.status(203).json({
        ok: true,
        msg: "변경 성공",
      });
    } catch (err) {
      res.status(404).json({
        ok: false,
        msg: "추천 실패",
      });
    }
  });

export default postRouter;
