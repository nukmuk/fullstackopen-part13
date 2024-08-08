const router = require("express").Router();
const UserBlogs = require("../models/user_blogs");

router.post("/", async (req, res, next) => {
  try {
    const entry = await UserBlogs.create(req.body);
    res.json(entry);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
