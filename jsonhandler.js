var fs = require("fs");
var path = require("path");
const { readJsonData } = require("./index");

var temp_stored_json = {
  "isUserWanted": false,
  "isAnchorWanted": false,
  "isButtonWanted": false,
  "isInputWanted": false,
  "percentageOfAnchor": 0,
  "percentageOfButton": 0,
  "percentageOfInput": 0,
  "numberOfAnchor" : 0,
  "numberOfButton" : 0,
  "numberOfInput" : 0,
  "wantedNumberOfAnchor": 0,
  "wantedNumberOfButton": 0,
  "wantedNumberOfInput": 0,
  "choosenIndex" : []
};


async function prepJsonData(filename) {
  // read test json  
  var testJson = readJsonData(filename);
  const percJsonFile = fs.readFileSync(
    path.join(__dirname, "storePercentages.json"),
    "utf-8"
  );
  const percJsonData = JSON.parse(percJsonFile);
  return storeRequestSelectorsNumber(testJson, percJsonData);
}

function writeUpdatedFormJson(jsonD){
    console.log(jsonD.choosenIndex[0].anchor[0]);
    fs.writeFileSync(path.join(__dirname, "storePercentages.json"), JSON.stringify(jsonD, null, 2));
}

function clearStoredJson(){
  fs.writeFileSync(path.join(__dirname, "storePercentages.json"), JSON.stringify(temp_stored_json, null, 2));
}

async function storeRequestSelectorsNumber(testJson, percJsonData){
  await testJson.tests.forEach((element) => {
    if (element.isFormRequest == true) {
      if (element.type == "a") percJsonData.numberOfAnchor += 1;
      else if (element.type == "button") percJsonData.numberOfButton += 1;
      else percJsonData.numberOfInput += 1;
    } 
  });
  return percJsonData;
}

function storeRequestedPercentages(percentage, type, jsonData) {
  if (type == "Anchor") { jsonData["percentageOfAnchor"] = percentage }
  else if (type == "Button") { jsonData["percentageOfButton"] = percentage }
  else { jsonData["percentageOfInput"] = percentage }
  return jsonData;
}

function storeRequestInfo(info, jsonData, requestType) {
  if (info == "Anchor") { jsonData["isAnchorWanted"] = true }
  else if (info == "Button") { jsonData.isButtonWanted = true }
  else { jsonData.isInputWanted = true };
  
  return jsonData;
}

module.exports = {
  storeRequestInfo,
  prepJsonData,
  storeRequestedPercentages,
  writeUpdatedFormJson,
  clearStoredJson
};
