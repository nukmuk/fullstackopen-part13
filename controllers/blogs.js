const { Blog } = require("../models");

const router = require("express").Router();

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id);
  next();
};

router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    res.json(blogs);
  } catch (e) {
    console.error(e);
  }
});

router.post("/", async (req, res) => {
  try {
    const blog = await Blog.create(req.body);
    return res.json(blog);
  } catch (e) {
    return res.status(400).json(e);
  }
});

router.delete("/:id", blogFinder, async (req, res) => {
  try {
    await req.blog.destroy();
    return res.sendStatus(204);
  } catch (e) {
    return res.status(400).json(e);
  }
});

module.exports = router;
