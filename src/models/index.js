const Blog = require("./blog");
const Session = require("./session");
const User = require("./user");
const UserBlogs = require("./user_blogs");

User.hasMany(Blog);
Blog.belongsTo(User);

User.belongsToMany(Blog, { through: UserBlogs, as: "readings" });
Blog.belongsToMany(User, { through: UserBlogs, as: "usersReadingList" });

User.hasMany(Session);
Session.belongsTo(User);

module.exports = {
  Blog,
  User,
  Session,
};
