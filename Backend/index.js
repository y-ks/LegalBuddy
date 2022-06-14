const express = require("express");
require("./db/mongoose");
const app = express();
const cors = require('cors');
const port = 5000;
const userRouter = require("./routers/user");

app.use(cors());
app.use(express.json());
app.use(userRouter);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
