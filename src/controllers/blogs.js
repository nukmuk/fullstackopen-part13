const jwt = require("jsonwebtoken");
const { Blog, User } = require("../models");
const { SECRET } = require("../util/config");
const { Op } = require("sequelize");
const { tokenExtractor } = require("../util/middleware");

const router = require("express").Router();

const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
    next();
  } catch (e) {
    next(e);
  }
};

router.get("/", async (req, res, next) => {
  try {
    const where = {};

    if (req.query.search) {
      where[Op.or] = [
        { title: { [Op.substring]: req.query.search } },
        { author: { [Op.substring]: req.query.search } },
      ];
    }

    console.log("where", where);
    console.log("query", req.query);

    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name"],
      },
      where,
      order: [["likes", "DESC"]],
    });
    res.json(blogs);
  } catch (e) {
    next(e);
  }
});

router.post("/", tokenExtractor, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.decodedToken.id);
    const blog = await Blog.create({ ...req.body, userId: user.id });
    return res.json(blog);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", blogFinder, tokenExtractor, async (req, res, next) => {
  try {
    console.log("current user:", req.decodedToken);
    const blogCreatedByUser = req.decodedToken.id === req.blog.userId;
    if (!blogCreatedByUser)
      return res.status(403).json({ error: "blog not created by you" });
    const user = await req.blog.destroy();
    return res.sendStatus(204);
  } catch (e) {
    next(e);
  }
});

router.put("/:id", blogFinder, async (req, res, next) => {
  try {
    req.blog.likes = req.body.likes;
    const updatedBlog = await req.blog.save();
    return res.json({ likes: updatedBlog.likes });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
