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

const updateUser = async (id, user) => {
  return await User.findByIdAndUpdate(id, user).exec();
};

const deleteUser = async (username) => {
  return await username.deleteOne();
};

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  updateUser,
  deleteUser,
  findAllUsers,
};
