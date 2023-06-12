import express from "express";
import Post from "../models/post.js";
import Comment from "../models/comment.js";

const commentRouter = express.Router();

/**댓글 생성 */
commentRouter.route("/").post(async (req, res, next) => {
  const { nick, content, id } = req.body;
  try {
    const result = await Comment.create({
      PostId: id,
      nick,
      content,
      recommend: 0,
      deprecated: 0,
    });

    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      ok: false,
      msg: "댓글 달기 실패",
    });
  }
});

/** 게시글 댓글들 찾기 */
commentRouter.route("/postId").get(async (req, res, next) => {
  const { id } = req.query;
  try {
    const result = await Comment.findAll({
      where: {
        PostId: id,
      },
    });
    res.status(200).json({
      ok: true,
      data: result,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      ok: false,
      msg: "댓글 조회 실패",
    });
  }
});

/**댓글 삭제하기 */
commentRouter
  .route("/id")
  .put(async (req, res, next) => {
    const { id, recommend, deprecated } = req.body;

    try {
      await Comment.update(
        {
          recommend,
          deprecated,
        },
        {
          where: {
            id,
          },
        }
      );
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
  })
  /**댓글 삭제하기 */
  .delete(async (req, res) => {
    const { id } = req.body;

    try {
      const result = await Comment.destroy({
        where: {
          id,
        },
      });
      res.status(202).json({
        ok: true,
        data: result,
      });
    } catch (err) {
      res.status(404).json({
        ok: false,
        msg: "실패",
      });
    }
  });

export default commentRouter;
