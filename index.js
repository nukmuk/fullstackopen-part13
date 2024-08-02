const express = require("express");
const config = require("./util/config");
const blogsRouter = require("./controllers/blogs");
const { connectToDatabase } = require("./util/db");
const errorHandler = require("./util/errorHandler");
const app = express();
app.use(express.json());

app.use("/api/blogs", blogsRouter);

app.use(errorHandler);

const start = async () => {
  await connectToDatabase();
  app.listen(config.PORT, () => {
    console.log(`Server running on port ${config.PORT}`);
  });
};


start();
