const { Session } = require("../models");
const { tokenExtractor } = require("../util/middleware");

const router = require("express").Router();

router.delete("/", tokenExtractor, async (req, res, next) => {
  try {
    const session = await Session.findOne({
      where: { token: req.token, active: true },
    });
    session.active = false;
    await session.save();
    res.status(200).json({ message: "logged out" });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
