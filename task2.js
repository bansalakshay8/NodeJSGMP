import MyEventEmitter from "./MyEventEmitter.js";
import https from "https";

class WithTime extends MyEventEmitter {
  async execute(asyncFunc, ...args) {
    try {
      this.emit("start");
      const startTime = Date.now();
      const result = await asyncFunc(...args);
      const endTime = Date.now();
      this.emit("data", result);
      this.emit("end", endTime - startTime);
    } catch (err) {
      this.emit("error", err);
    }
  }
}

const fetchFromUrl = (url, cb) => {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          resolve(JSON.parse(data));
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const withTime = new WithTime();
withTime.on("start", () => console.log("About to execute"));
withTime.on("end", (data) =>
  console.log("Done with execut and time taken is:", data)
);
withTime.on("data", (response) => console.log("Received data is :", response));

withTime.execute(fetchFromUrl, "https://jsonplaceholder.typicode.com/posts/1");

console.log(withTime.rawListeners("end"));
