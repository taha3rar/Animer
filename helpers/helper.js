const bcrypt = require("bcrypt");
const mongoose=require('mongoose')
const compare = async (password, hasher) => {
  return bcrypt.compare(password, hasher);
};
const encrypt = async (password) => {
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  return bcrypt.hash(password, salt);
};
const getUser = (id) => {
  return mongoose.model("user").findOne({ _id: id }).exec();
};
const getKeeps = (id) => {
  return mongoose.model("keep").findOne({ owner: id }).exec();
};
const getFavs = (id) => {
  return mongoose.model("favorites").findOne({ owner: id }).exec();
};
const getWatched = (id) => {
  return mongoose.model("watched").findOne({ owner: id }).exec();
};

module.exports = {
  compare,
  encrypt,
  getUser,
  getKeeps,
  getFavs,
  getWatched,
};
