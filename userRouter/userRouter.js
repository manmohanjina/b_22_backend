const expres = require("express");
const bcrypt = require("bcrypt");
const UserRouter = expres.Router();
const { UserModel } = require("../models/user.Model");
const jwt = require("jsonwebtoken");

UserRouter.post("/register", async (req, res) => {
  let { email, pass, name, age } = req.body;

  try {
    bcrypt.hash(pass, 5, async (err, secure_password) => {
      //store hash in your password at db
      if (err) {
        console.log(err);
      } else {
        let data = await new UserModel({
          email,
          pass: secure_password,
          name,
          age,
        });
        await data.save();
        res.send("user registed successfully");
      }
    });
  } catch (err) {
    console.log(err);
    res.send("user not registerd");
  }
});

UserRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  console.log(pass, "password");
  const user = await UserModel.find({ email });
  console.log(user);

  try {
    if (user.length == 0) {
      res.send("no user found ");
    }

    if (user.length > 0) {
      const token = jwt.sign({ userId: user[0]._id }, "manish");

      bcrypt.compare(pass, user[0].pass, (err, result) => {
        console.log(pass, "pass");
        if (result) {
          res.send({ msg: "login success", token: token });
        } else {
          res.send("wrong credential");
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  UserRouter,
};
