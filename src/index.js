const express = require("express");
const config = require("./util/config");
const blogsRouter = require("./controllers/blogs");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const authorsRouter = require("./controllers/authors");
const readingListsRouter = require("./controllers/readinglists");
const logoutRouter = require("./controllers/logout");
const { connectToDatabase } = require("./util/db");
const errorHandler = require("./util/errorHandler");
const app = express();
app.use(express.json());

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);
app.use("/api/login", loginRouter);
app.use("/api/authors", authorsRouter);
app.use("/api/readinglists", readingListsRouter);
app.use("/api/logout", logoutRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};

start();
