require("dotenv").config();
const express = require("express");
const { Sequelize, Model, DataTypes } = require("sequelize");
const app = express();
app.use(express.json());

const sequelize = new Sequelize(process.env.DATABASE_URL);

class Blog extends Model { }

Blog.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    author: {
        type: DataTypes.TEXT,
    },
    url: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    title: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    likes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "blog"
})

app.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await Blog.findAll();
        res.json(blogs);
    } catch (e) {
        console.error(e);
    }
});

app.post("/api/blogs", async (req, res) => {
    try {
        const blog = await Blog.create(req.body);
        return res.json(blog);
    } catch (e) {
        return res.status(400).json(e);
    }
});

app.delete("/api/blogs/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const blog = await Blog.findByPk(id);
        await blog.destroy();
        return res.sendStatus(204);
    } catch (e) {
        return res.status(400).json(e);
    }
});


const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});