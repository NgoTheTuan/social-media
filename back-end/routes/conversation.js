const router = require("express").Router();
const Conversation = require("../models/Conversation");
const verifyToken = require("../middleware/verifyToken");

//new conv
router.post("/", verifyToken, async (req, res) => {
  const newConversation = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get conv of a user
router.get("/:userId", verifyToken, async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    return res.status(200).json({
      success: true,
      conversation,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get conv includes two userId
router.get(
  "/find/:firstUserId/:secondUserId",
  verifyToken,
  async (req, res) => {
    try {
      const conversation = await Conversation.findOne({
        members: { $all: [req.params.firstUserId, req.params.secondUserId] },
      });
      res.status(200).json(conversation);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

module.exports = router;
