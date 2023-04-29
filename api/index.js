// Pronajit Dey (29/04/23)
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");
const bcrypt = require("bcrypt");
const User = require("./models/User");

dotenv.config();
mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true});
const jwtSecret = process.env.JWT_SECRET;

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL,
}));


app.get("/test", (req, res) => {
  res.json("trender test ok");
});

app.get("/home", (req, res) => {
  const token = req.cookies?.token;
  if (token) {
    jwt.verify(token, jwtSecret, {}, (err, userData) => {
      if (err) throw err;
      res.json(userData);
    });
  } else {
    res.status(401).json("no token");
  }
});

app.post("/register", async (req, res) => {
  const {name, username, email, password} = req.body;
  try {
    const hashedPassword = bcrypt.hashSync(password, process.env.SALT_ROUNDS | 0);
    const createdUser = await User.create({
      name: name,
      username: username,
      email: email,
      password: hashedPassword
    });
    // console.log(createdUser);

    jwt.sign({userId: createdUser._id, username}, jwtSecret, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token, {sameSite: "none", secure: true}).status(201).json({
        id: createdUser._id
      });
    });

  } catch (err) {
    if (err) throw err;
    res.status(500).json("error");
  }
});

app.listen(4040, () => {
  console.log("Server started on port 4040");
});
