const User = require("../models/User");

const findAllUsers = async () => {
  return await User.find().select("-password").lean();
};

const createUser = async (user) => {
  return await User.create(user);
};

const findUserByUsername = async (username) => {
  const query = User.where({ username });
  return await query.findOne().lean().exec();
};

const findUserById = async (id) => {
  return await User.findById(id).exec();
};

const updateUser = async (username, update) => {
  return await User.updateOne(username, update).exec();
};

const deleteUser = async (username) => {
  return await User.deleteOne(username).exec();
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  updateUser,
  deleteUser,
  findAllUsers,
};
