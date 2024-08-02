const jwt = require("jsonwebtoken");
const { Blog, User } = require("../models");
const { SECRET } = require("../util/config");

const router = require("express").Router();

const blogFinder = async (req, res, next) => {
  try {
    req.blog = await Blog.findByPk(req.params.id);
    next();
  } catch (e) {
    next(e);
  }
};

const tokenExtractor = (req, res, next) => {
  const authorization = req.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    try {
      console.log(authorization.substring(7));
      req.decodedToken = jwt.verify(authorization.substring(7), SECRET);
    } catch (error) {
      console.log(error);
      return res.status(401).json({ error: "token invalid" });
    }
  } else {
    return res.status(401).json({ error: "token missing" });
  }
  next();
};

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      attributes: { exclude: ["userId"] },
      include: {
        model: User,
        attributes: ["name"],
      },
    });
    res.json(blogs);
  } catch (e) {
    console.error(e);
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

router.delete("/:id", blogFinder, async (req, res, next) => {
  try {
    await req.blog.destroy();
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
