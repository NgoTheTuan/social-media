const router = require("express").Router();
const Message = require("../models/Message");
const verifyToken = require("../middleware/verifyToken");

//add

router.post("/", verifyToken, async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();

    return res.status(200).json({
      success: true,
      savedMessage,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//get

router.get("/:conversationId", verifyToken, async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    return res.status(200).json({
      success: true,
      messages,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
