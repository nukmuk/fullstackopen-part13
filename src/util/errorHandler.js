const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  // if (err.name === "SequelizeValidationError")
  //   res.status(400).send({ error: err.errors[0].message });

  res.status(400).send({ error: err.message });

  next(err);
};

module.exports = errorHandler;
