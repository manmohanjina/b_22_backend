const express = require("express");
const app = express();
const cors=require('cors')
require("dotenv").config();
app.use(express.json());
app.use(cors())
const jwt=require('jsonwebtoken')
const { connection } = require("./config/db");
const { UserModel } = require("./models/user.Model");
const {UserRouter}=require("./userRouter/userRouter")
const {noteroute}=require('./userRouter/notes.Route')
const {autheticate}=require("./middleware/authenticate.middleware")
app.get("/", async (req, res) => {
  res.send({"msg":"hello user WELCOME"});
});

app.get("/homepage", (req, res) => {
  res.send("homepage");
});
app.get("/about", (req, res) => {
  res.send("about section");
});


UserRouter.get("/cart", async (req, res) => {
  const token = req.headers.authorization;
  console.log(token, "token");
  jwt.verify(token, "manish", async (err, decode) => {
    if (err) {
      console.log(err);
      res.send("Invalid credential");
    } else {
      console.log("WELCOME TO CART PAGE");
      const data = await UserModel.find();
      res.send(data);
    }
  });
});
app.use('/', UserRouter)
app.use(autheticate)

app.use('/notes', noteroute)




app.listen(process.env.port, () => {
  try {
    console.log(`server stand by at ${process.env.port}`);
    connection();
  } catch (err) {
    console.log(err);
    console.log("error while connectig to server");
  }
});

