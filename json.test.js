var fs = require("fs");
var path = require("path");

const { clearStoredJson } = require("./jsonhandler");

jest.setTimeout(30000);
const timeout = 3000;

const json = fs.readFileSync(process.env.TEST_ENV_VAR, "utf-8");
const jsonD = JSON.parse(json);

const answerjsonFile = fs.readFileSync(
  path.join(__dirname, "storePercentages.json"),
  "utf-8"
);

const answerjsonData = JSON.parse(answerjsonFile); // asnwers json.

function getJsonData() {
  return jsonD;
}

// Test Start Below
beforeAll(async () => {
  await page.goto(URL[0], { waitUntil: "domcontentloaded" });
});

afterAll(() => {
  clearStoredJson();
  console.log("Stored Json Data resetted");
});

async function checkExistence(type) {
  var index = 0;
  var exists;
  if(type == "a"){
    var holder = answerjsonData.wantedNumberOfAnchor;
    while(holder > 0) {
      exists = await page.$eval(jsonD.tests[answerjsonData.choosenIndex[0].anchor[index]].data, (el) => el.outerHTML);
      console.log(jsonD.tests[answerjsonData.choosenIndex[0].anchor[index]].data);
      console.log(exists);
      holder--;
      index++;
    }
    console.log(exists);
    if (exists == null) return false;
    else return true;  
  }  else if (type == "button"){
    var holder = answerjsonData.wantedNumberOfAnchor;
    while(holder > 0) {
      exists = await page.$eval(jsonD.tests[answerjsonData.choosenIndex[0].anchor[index]].data, (el) => el.outerHTML);
      console.log(exists);
      holder--;
      index++;
    }
    console.log(exists);
    if (exists == null) return false;
    else return true;  
  } else {
    var holder = answerjsonData.wantedNumberOfAnchor;
    while(holder > 0) {
      exists = await page.$eval(jsonD.tests[answerjsonData.choosenIndex[0].anchor[index]].data, (el) => el.outerHTML);
      console.log(exists);
      holder--;
      index++;
    }
    console.log(exists);
    if (exists == null) return false;
    else return true;  
  }
}

var testCount = 0;
var total = answerjsonData.wantedNumberOfAnchor + answerjsonData.wantedNumberOfButton + answerjsonData.wantedNumberOfInput

for (let index = 0; index < jsonD.tests.length; index++) {
  describe("Test", () => {
    test("Jotform Test", async () => {
      if (
        jsonD.tests[index].isFormRequest == false &&
        answerjsonData.isUserWanted == true
      ) 
      {
        console.log(jsonD.tests[index].data);
        if (jsonD.tests[index].data == "urlAddition") {
          console.log("Url Navigation Started");
          await page.goto(jsonD.tests[index].url, {
            waitUntil: "networkidle0",
          });
          console.log("loading page", jsonD.tests[index].url);
        }
        else if (
          jsonD.tests[index].type != "input" &&
          jsonD.tests[index].url == "no"
        ) {
          await expect(page).toClick(jsonD.tests[index].data);
        } else if (jsonD.tests[index].type == "input") {
          await page.waitForSelector(jsonD.tests[index].data);
          await expect(page).toClick(jsonD.tests[index].data);
          await page.keyboard.sendCharacter(jsonD.tests[index].value);
        } else if (
          jsonD.tests[index].url != "no" &&
          jsonD.tests[index].data != "urlAddition"
        ) {
          await page.evaluate(
            (selector) => document.querySelector(selector).click(),
            jsonD.tests[index].data
          );
          await page.goto(jsonD.tests[index].url, {
            waitUntil: "networkidle0",
          });
        }  
      } 
      else if (jsonD.tests[index].isFormRequest == true){
        var callback;
        console.log(jsonD.tests[index].type);
        if (testCount < total) {
          if (answerjsonData.isAnchorWanted == true && jsonD.tests[index].type == "a"){
          console.log("Check");
          callback = await checkExistence(jsonD.tests[index].type);
          expect(callback).toBe(true);
          testCount++;
          }
        } else if(answerjsonData.isButtonWanted == true && jsonD.tests[index].type == "button") {
          console.log("Check");
          callback = await checkExistence(jsonD.tests[index].type);
          expect(callback).toBe(true);
          testCount++;
        } else if (answerjsonData.isInputWanted == true && jsonD.tests[index].type == "input") {
          console.log("Check");
          callback = await checkExistence(jsonD.tests[index].type);
          expect(callback).toBe(true);
          testCount++;
        }
      }
    });
  });
}

module.exports = {
  getJsonData,
};
