const { Blog } = require("../models");
const { sequelize } = require("../util/db");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      // attributes: [[sequelize.fn("COUNT", sequelize.col("likes")), "n_likes"]],
      attributes: [
        "author",
        [sequelize.fn("COUNT", sequelize.col("id")), "blogs"],
        [sequelize.fn("SUM", sequelize.col("likes")), "likes"],
      ],
      group: [["author"]],
    });
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
