const http = require("http");
const router = require("./src/router");

const server = http.createServer(router.handleRequest);

server.listen(8000, () => {
  console.log("Server listening on port 8000");
});

process.on("SIGTERM", () => {
  server.close(() => {
    console.log("Server shut down.");
  });
});
