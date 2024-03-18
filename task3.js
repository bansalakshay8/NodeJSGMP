import csvtojson from "csvtojson";
import { Transform } from "stream";
import fs from "fs";

const csvFilePath = "./csv/mod3_task3.csv";

const readableStream = fs.createReadStream(csvFilePath, "utf-8");
const writableStream = fs.createWriteStream("output.txt");
const csvToJsonTransform = new Transform({
  writableObjectMode: true,
  transform(chunk, encoding, callback) {
    csvtojson()
      .fromString(chunk)
      .then((jsonArray) => {
        jsonArray.forEach((obj) => {
          this.push(JSON.stringify(obj) + "\n");
        });
        callback();
      })
      .catch((err) => {
        callback(err);
      });
  },
});

readableStream.pipe(csvToJsonTransform);

csvToJsonTransform.pipe(writableStream);

readableStream.on("error", () => {
  console.log("Error while reading content from .csv file");
});

writableStream.on("error", (err) => {
  console.error("Error while writing context to a .txt file:", err);
});

writableStream.on("finish", () => {
  console.log("Data has been written to output.txt");
});
