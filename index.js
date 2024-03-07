const childProcess = require("child_process");
const os = require("os");
const fs = require("fs");

const commandToGetTopProcess = {
  Linux: `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`,
  Darwin: `ps -A -o %cpu,%mem,comm | sort -nr | head -n 1`,
  Windows_NT: `powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + ' ' + $_.CPU + ' ' + $_.WorkingSet }"`,
};

let fileBuffer = Buffer.alloc(0);

const execCommand = (command) => {
  childProcess.exec(command, (error, stdout, stderr) => {
    if (error !== null) {
      console.log(`stderr error: ${error}`);
    }
    console.clear();
    console.log(stdout);

    let dataToBeAppendedToBuffer = Buffer.from(
      `${new Date().toISOString()} : ${stdout}`
    );

    fileBuffer = Buffer.concat([fileBuffer, dataToBeAppendedToBuffer]);
  });
};

setInterval(() => {
  execCommand(commandToGetTopProcess[os.type()]);
}, 100);

setInterval(() => {
  fs.appendFile("activityMonitor.log", fileBuffer.toString(), (err) => {
    if (err) throw err;
    fileBuffer = Buffer.alloc(0);
  });
}, 60000);
