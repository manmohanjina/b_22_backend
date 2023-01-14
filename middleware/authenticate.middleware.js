const jwt = require("jsonwebtoken");

const autheticate = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    const decode = jwt.verify(token, "manish");
    if (decode) {
      const userId = decode.userId;
      console.log(userId,'userId',decode)
      req.body.userId=userId
      next();
    } else {
      res.send({"msg":"need to Login First"});
    }
  } else {
    res.send({"msg":"login first"})
  }
};

module.exports = {
  autheticate,
};
