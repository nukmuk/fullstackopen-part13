const { Sequelize, Model, DataTypes } = require("sequelize");
const { Umzug, SequelizeStorage } = require("umzug");
const config = require("./config");

const sequelize = new Sequelize(config.DATABASE_URL);

const migrationConf = {
  migrations: {
    glob: "src/migrations/*.js",
  },
  storage: new SequelizeStorage({ sequelize, tableName: "migrations" }),
  context: sequelize.getQueryInterface(),
  logger: console,
};
const runMigrations = async () => {
  const migrator = new Umzug(migrationConf);
  const migrations = await migrator.up();
  console.log("Migrations up to date", {
    files: migrations.map((mig) => mig.name),
  });
};
const rollbackMigration = async () => {
  await sequelize.authenticate();
  const migrator = new Umzug(migrationConf);
  await migrator.down();
};
const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    await runMigrations();
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
  rollbackMigration,
};
