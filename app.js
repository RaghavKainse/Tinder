const express = require("express");
const app = express();
const { connectDb } = require("./src/config/dataBase");
const User = require("./src/models/user.model.js");
const validators = require("./src/validators/emailValidator.js");
const bcryptjs = require("bcryptjs");
const authRoute= require('./src/routes/auth.routes.js')
app.use(express.json());
const cookie= require('cookie-parser');


app.use(cookie())
// signUp
app.use("/",authRoute)

app.post("/user", async (req, res) => {
  const data = req.body;
  await User.insertOne(data);
  console.log("data inserted");
  res.send("data send");
});

// connection
const PORT = 3000;
app.get("/", (req, res) => {
  res.send("jo");
});
connectDb()
  .then(() => {
    console.log("😍 DataBase connection success");
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log("error Database in connection");
  });
