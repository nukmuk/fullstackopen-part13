const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("database connected");
  } catch (err) {
    console.log("database connection failed");
    return process.exit(1);
  }

  return null;
};

module.exports = {
  sequelize,
  connectToDatabase,
};
