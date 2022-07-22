const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const dbConnection = require("./db");
app.use(express.json());

app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/lawyers", require("./routes/lawyersRoute"));
app.use("/api/admin", require("./routes/adminRoute"));
app.use("/api/bookings", require("./routes/bookingsRoute"));
app.use("/api/conversation", require("./routes/conversationRoute"));
app.use("/api/message", require("./routes/messageRoute"));
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log("server started"));
