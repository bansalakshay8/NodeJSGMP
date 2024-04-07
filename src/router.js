const userController = require("./controllers/userController");

exports.handleRequest = (req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/api/users" && method === "POST") {
    userController.createUser(req, res);
  } else if (url === "/api/users" && method === "GET") {
    userController.getUsers(req, res);
  } else if (url.startsWith("/api/users/") && method === "DELETE") {
    const userId = url.split("/")[3];
    userController.deleteUser(req, res, userId);
  } else if (
    url.startsWith("/api/users/") &&
    url.endsWith("/hobbies") &&
    method === "GET"
  ) {
    const userId = url.split("/")[3];
    userController.getUserHobbies(req, res, userId);
  } else if (
    url.startsWith("/api/users/") &&
    url.endsWith("/hobbies") &&
    method === "PATCH"
  ) {
    const userId = url.split("/")[3];
    userController.updateUserHobbies(req, res, userId);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Not found" }));
  }
};
