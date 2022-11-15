const router = require("express").Router();
const User = require("../models/User");
const argon2 = require("argon2");

const verifyToken = require("../middleware/verifyToken");

// UPDATE USER
router.put("/:id", verifyToken, async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        req.body.password = await argon2.hash(req.body.password);
      } catch (error) {
        return res.status(500).json(error);
      }
    }

    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You cam update only your Account");
  }
});

// DELETE USER
router.delete("/:id", verifyToken, async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.status(200).json("Account has been deleted");
    } catch (error) {
      return res.status(500).json(error);
    }
  } else {
    return res.status(403).json("You cam update only your Account");
  }
});

// GET A USER
router.get("/", verifyToken, async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });

    return res.status(200).json({
      success: true,
      message: "Get a user in success",
      user,
    });
  } catch (error) {
    res.status(500).json({ mess: "loi tim user" });
  }
});

// GET FRIEND USER
router.get("/friend", verifyToken, async (req, res) => {
  const userId = req.query.userId;

  try {
    let friendUser = [];
    const user = await User.findById(userId);

    if (user.followings.length > 0) {
      for (let i = 0; i < user.followings.length; i++) {
        const userFollowing = await User.findById(user.followings[i]);
        friendUser.push(userFollowing);
      }
      return res.status(200).json({
        success: true,
        message: "Get friend user in success",
        friendFollowing: friendUser,
      });
    }

    return res.status(200).json({
      success: true,
      message: "You don't have any friends ",
    });
  } catch (error) {
    res.status(500).json({ mess: "loi tim user" });
  }
});

// FOLLOW USER

router.put("/:id/follow", verifyToken, async (req, res) => {
  //req.params.id: id của người đi theo dõi
  // req.body.userId : id của người được theo dõi

  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (!user.followers.includes(req.body.userId)) {
        await user.updateOne({ $push: { followers: req.body.userId } });
        await currentUser.updateOne({ $push: { followings: req.params.id } });
        res.status(200).json("user has been followed");
      } else {
        res.status(403).json("you allready follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you can't follow yourself");
  }
});

// UNFOLLOW USER

router.put("/:id/unfollow", verifyToken, async (req, res) => {
  if (req.body.userId !== req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      const currentUser = await User.findById(req.body.userId);
      if (user.followers.includes(req.body.userId)) {
        await user.updateOne({ $pull: { followers: req.body.userId } });
        await currentUser.updateOne({ $pull: { followings: req.params.id } });
        res.status(200).json("user has been unfollowed");
      } else {
        res.status(403).json("you dont follow this user");
      }
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(403).json("you cant unfollow yourself");
  }
});

module.exports = router;
