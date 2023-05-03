const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const uri =
  "mongodb+srv://jshwa0429:asrai%237931@cluster0.9njhpor.mongodb.net/test";

async function connect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connected to mongoDB");
  } catch (error) {
    console.error(error);
  }
}

connect();

const Schema = mongoose.Schema;
const userSchema = new Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

const user = new User({
  username: "jack",
  password: "12345",
});

user
  .save()
  .then(() => {
    console.log("New user has been saved to the database successfully");
  })
  .catch((err) => {
    console.log(err);
  });

app.listen(3000, () => {
  console.log("Server Listening on port 3000");
});

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.post("/", (req, res) => {
  const { username, password } = req.body;
  const user = new User({ username, password });
  user
    .save()
    .then(() => res.send("User saved to the database"))
    .catch((error) => res.status(500).send(error));
});
