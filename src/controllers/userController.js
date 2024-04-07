const userService = require("../services/userService");

exports.createUser = (req, res) => {
  userService.createUser(req, res);
};

exports.getUsers = (req, res) => {
  userService.getUsers(req, res);
};

exports.deleteUser = (req, res, userId) => {
  userService.deleteUser(req, res, userId);
};

exports.getUserHobbies = (req, res, userId) => {
  userService.getUserHobbies(req, res, userId);
};

exports.updateUserHobbies = (req, res, userId) => {
  userService.updateUserHobbies(req, res, userId);
};
