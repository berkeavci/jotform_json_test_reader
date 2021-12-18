const fs = require("fs");
const path = require("path");


function getCountOfOperations(filename) {
  fs.readFile(path.join(__dirname , filename), (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    jsonData = JSON.parse(data);
    var count = 0;
    jsonData.tests.forEach((element) => {
      count++;
    });
    console.log("\n " + count + " times click operation happened during the recording");
  });
}

module.exports = {
  getCountOfOperations,
};
