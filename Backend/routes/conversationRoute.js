const router = require("express").Router();
const Conversation = require("../models/Conversation");

//new conv
router.post("/", async (req, res) => {
  const newConv = Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const savedConv = await newConv.save();
    res.status(200).send(savedConv);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get user conv

router.get("/:usedId", async (req, res) => {
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.usedId] },
    });
    res.status(200).send(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
