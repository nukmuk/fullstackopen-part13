const errorHandler = (err, req, res, next) => {
  console.error(err.message);

  res.status(400).send({ error: err.message });

  next(err);
};

module.exports = errorHandler;
