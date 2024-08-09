const jwt = require("jsonwebtoken");
const { SECRET } = require("./config");
const { Session, User } = require("../models");

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      const token = authorization.substring(7);
      authorization.substring(7);
      console.log(token);
      const decodedToken = jwt.verify(token, SECRET);
      const user = await User.findByPk(decodedToken.id);
      if (user.disabled) throw new Error("user account is disabled");
      const session = await Session.findOne({
        where: { token: token, active: true },
      });
      if (!session) throw new Error("session inactive");
      req.decodedToken = decodedToken;
      req.token = token;
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

module.exports = { tokenExtractor };
