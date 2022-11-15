const router = require("express").Router();
const Comment = require("../models/Comment");
const verifyToken = require("../middleware/verifyToken");

//create a comment
router.post("/", verifyToken, async (req, res) => {
  const newComment = new Comment(req.body);
  try {
    const savedComment = await newComment.save();

    return res.status(200).json({
      success: true,
      message: "Create comment in success",
      post: savedComment,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Errorss" });
  }
});

//delete a comment
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (comment.userId === req.userId) {
      await comment.deleteOne();
      return res.status(200).json({
        success: true,
        message: "The Comment has been deleted",
      });
    } else {
      res.status(403).json("you can delete only your comment");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like / dislike a comment
router.put("/:id/like", verifyToken, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment.likes.includes(req.body.userId)) {
      await comment.updateOne({ $push: { likes: req.body.userId } });

      return res.status(200).json({
        success: true,
        message: "The comment has been liked",
      });
    } else {
      await comment.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json({
        success: true,
        message: "The comment has been disliked",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all comments
router.get("/getall/:postId", verifyToken, async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });

    console.log(comments);

    return res.status(200).json({
      success: true,
      message: "Alls comments in success",
      allsComment: comments,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
