const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const commentRoutes = require("./routes/comment");
const conversationRoutes = require("./routes/conversation");
const messageRoutes = require("./routes/message");

const videoRoutes = require("./routes/video");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB is connected!!!"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection fail ${err.message}`);
});

//middleware
app.use(express.json());
app.use(cors());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000"],
  })
);

app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"));

app.use("/upload", videoRoutes);
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/conversations", conversationRoutes);
app.use("/api/messages", messageRoutes);

app.listen(4000, () => {
  console.log("Back end server is ready 4000!");
});
