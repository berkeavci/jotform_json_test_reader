var fs = require("fs");
var path = require("path");

function prepJsonData() {
  const jsonFile = fs.readFileSync(
    path.join(__dirname, "storePercentages.json"),
    "utf-8"
  );
  const jsonData = JSON.parse(jsonFile);
  console.info(jsonData);
  return jsonData;
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
  storeRequestedPercentages
};
