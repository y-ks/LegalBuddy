const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Message", MessageSchema);

const messageModel = mongoose.model("Message", MessageSchema);

module.exports = messageModel;
