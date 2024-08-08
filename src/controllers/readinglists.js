const router = require("express").Router();
const UserBlogs = require("../models/user_blogs");
const { tokenExtractor } = require("../util/middleware");

router.post("/", async (req, res, next) => {
  try {
    const entry = await UserBlogs.create(req.body);
    res.json(entry);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", tokenExtractor, async (req, res, next) => {
  try {
    const reading = await UserBlogs.findByPk(req.params.id);
    if (req.decodedToken.id !== reading.userId)
      return res.status(403).json({ error: "not your reading list" });
    reading.read = req.body.read;
    await reading.save();
    res.json(reading);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
