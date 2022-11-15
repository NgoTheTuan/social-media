const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");
const verifyToken = require("../middleware/verifyToken");

const fileUploader = require("../configs/cloudinary.config");

//create a post
router.post("/", verifyToken, async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();

    return res.status(200).json({
      success: true,
      message: "Create post in success",
      post: savedPost,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Errorss" });
  }
});

//update a post
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("you can update only your post");
    }
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Errorss" });
  }
});

//delete a post
router.delete("/", verifyToken, async (req, res) => {
  console.log(req.query.idUser);
  console.log(req.query.idPost);
  try {
    const post = await Post.findById(req.query.idPost);
    if (post.userId === req.query.idUser) {
      await post.deleteOne();
      return res.status(200).json({
        success: true,
        message: "Delete post in success",
      });
    } else {
      res.status(403).json("you can delete only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//like / dislike a post
router.put("/:id/like", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });

      return res.status(200).json({
        success: true,
        message: "The post has been liked",
      });
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      return res.status(200).json({
        success: true,
        message: "The post has been disliked",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//get a post
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get timeline posts
router.get("/timeline/:userId", verifyToken, async (req, res) => {
  console.log("get all post");

  try {
    const currentUser = await User.findById(req.params.userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    return res.status(200).json({
      success: true,
      message: "Alls post in success",
      allsPost: userPosts.concat(...friendPosts),
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get user's posts
router.get("/profile/:userId", verifyToken, async (req, res) => {
  try {
    // const user = await User.findOne({ username: req.params.username });
    const post = await Post.find({ userId: req.params.userId });

    return res.status(200).json({
      success: true,
      message: "user post in success",
      post,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Upload img
router.post(
  "/cloudinary-upload",
  fileUploader.single("file"),
  (req, res, next) => {
    console.log("update");
    if (!req.file) {
      next(new Error("No file uploaded!"));
      return;
    }

    res.json({ secure_url: req.file.path });
  }
);

module.exports = router;
