const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const {
  createUser,
  findUserByUsername,
  findUserById,
  updateUser,
  deleteUser,
  findAllUsers,
} = require("../services/userService");

//  @description Get all users
//  @route GET /users
//  @access Private
const getUsersHandler = asyncHandler(async (req, res) => {
  const users = await findAllUsers();
  if (!users?.length) {
    return res.status(400).json({ message: "Users not found" });
  }

  return res.json(users);
});

//  @description Get a user
//  @route GET /users/:id
//  @access Private
const getUserHandler = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const user = await findUserById(id);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  return res.json(user);
});

//  @description Create a new user
//  @route POST /users
//  @access Public
const createUserHandler = asyncHandler(async (req, res) => {
  const { name, password, username, email, phone, roles } = req.body;

  if (!username || !password || !email || !phone || !name) {
    return res.status(400).json({ message: "All fields must be provided." });
  }

  const duplicate = await findUserByUsername(username);

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate username." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userObject =
    !Array.isArray(roles) || !roles.length
      ? { username, password: hashedPassword, name, email, phone }
      : { username, password: hashedPassword, name, email, phone, roles };

  const created = await createUser(userObject);

  if (created) {
    res
      .status(201)
      .json({ message: `User ${userObject.username} created successfully` });
  } else {
    res
      .status(400)
      .json({ message: `User ${userObject.username} could not be created` });
  }
});

//  @description Update a user
//  @route PATCH /users
//  @access Private
const updateUserHandler = asyncHandler(async (req, res) => {
  const { name, password, username, email, phone, roles } = req.body;
  const id = req.params.id;

  if (
    !name ||
    !username ||
    !email ||
    !phone ||
    !Array.isArray(roles) ||
    !roles.length
  ) {
    return res.status(400).json({ message: "Fields must be provided." });
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const user = await findUserById(id);

  if (!user) {
    return res.status(400).json({ message: "User not found." });
  }

  const duplicate = await findUserByUsername(username);

  if (duplicate && duplicate?._id.toString() !== id) {
    return res.status(409).json({ message: "Duplicate username." });
  }

  user.username = username;
  user.email = email;
  user.phone = phone;
  user.name = name;
  user.roles = roles;

  if (password) {
    user.password = await bcrypt.hash(password, 10);
  }

  const updatedUser = await updateUser(id, user);

  res.json({ message: `User ${updatedUser.username} updated successfully` });
});

//  @description Delete a user
//  @route DELETE /users
//  @access Private
const deleteUserHandler = asyncHandler(async (req, res) => {
  const id = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(400)
      .json({ message: "Id parameter must be a valid mongo object id" });
  }

  const user = await findUserById(id);

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const deletedUser = await deleteUser(user);

  res.json({ message: `User ${deletedUser.username} deleted successfully` });
});

module.exports = {
  getUsersHandler,
  getUserHandler,
  createUserHandler,
  updateUserHandler,
  deleteUserHandler,
};
