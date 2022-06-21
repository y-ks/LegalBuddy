const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect(
    "mongodb+srv://ashim:ashim@cluster0.mubwo.mongodb.net/legalbuddy",
    { useUnifiedTopology: true, useNewUrlParser: true }
  );

  const connection = mongoose.connection;

  connection.on("connected", () => {
    console.log("connected");
  });

  connection.on("error", () => {
    console.log("error occured");
  });
}

connectDB();

module.exports = mongoose;
