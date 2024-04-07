const userModel = require("../models/userModel");

exports.createUser = (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const user = JSON.parse(body);
    userModel.createUser(user);
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(user));
  });
};

exports.getUsers = (req, res) => {
  const users = userModel.getUsers();
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users));
};

exports.deleteUser = (req, res, userId) => {
  userModel.deleteUser(userId);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "User deleted" }));
};

exports.getUserHobbies = (req, res, userId) => {
  const hobbies = userModel.getUserHobbies(userId);
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(hobbies));
};

exports.updateUserHobbies = (req, res, userId) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const hobbies = JSON.parse(body);
    userModel.updateUserHobbies(userId, hobbies);
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(hobbies));
  });
};
