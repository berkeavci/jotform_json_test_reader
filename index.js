const fs = require("fs");
const path = require("path");

function readJsonData(filename){
  const data = fs.readFileSync(path.join(__dirname, filename));
  const jsonData = JSON.parse(data);
  console.log(jsonData);
  return jsonData;
}

function testJson(jsonData) {
  const testFile = require('./json.test').default.default;
  testFile.testingFunc(jsonData);
  
}


module.exports = {
  readJsonData,
  testJson,
};
