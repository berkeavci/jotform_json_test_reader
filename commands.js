#! /usr/bin/env node
const program = require("commander");
const prompt = require("inquirer").createPromptModule();

const { readJsonData } = require("./index");

const { getCountOfOperations } = require("./options");

const { isRequested } = require("./requestCheck");

const { commandExec, moveJsonFile } = require("./exec_command");

const { answerCond, assignPercentage } = require("./answerConditions");

const { prepIndex } = require('./prep_index');

const {
  storeRequestInfo,
  prepJsonData,
  writeUpdatedFormJson
} = require("./jsonhandler");

/*  
    Command Line Application Flow 
        - When test has started, we search for isRequest true, then we start the puppeteer.
            - If we find isRequest true, we ask user to "do you wanna also check the viability of selectors?" if yes then: 
                - In the order of a, button and input we ask "x anchor selector has found, please write percentage of selector you want to check for viability"
                    - Then in order we do clicks, and check selectors viability. 
                    
*/

var numberOfPercent = 0;

const askRequest = [
  {
    type: "confirm",
    name: "isRequested",
    message:
      "In json, you've requested DOM content. Dou you want to check existence of selectors in requested DOM?",
    default: true,
  },
];

const validateElements = [
  {
    type: "checkbox",
    name: "numberOfSelectorsToCheck",
    message: "Please select the element(s) you want to check their selectors?",
    choices: ["Anchor", "Button", "Input"],
    default: "Button",
  },
  {
    type: "list",
    name: "percentageOfAnchor",
    message:
      " What percentage of selectors you want to check their existance for ANCHOR ?",
    choices: [0, 20, 40, 60, 80, 100],
    default: 0,
    when(answers) {
      if (answerCond("Anchor", answers)) {
        numberOfPercent++;
        return true;
      }
      return false;
    },
  },
  {
    type: "list",
    name: "percentageOfButton",
    message:
      " What percentage of selectors you want to check their existance for BUTTON ?",
    choices: [0, 20, 40, 60, 80, 100],
    default: 0,
    when(answers) {
      if (answerCond("Button", answers)) {
        numberOfPercent++;
        return true;
      }
      return false;
    },
  },
  {
    type: "list",
    name: "percentageOfInput",
    message:
      " What percentage of selectors you want to check their existance for INPUT ?",
    choices: [0, 20, 40, 60, 80, 100],
    default: 0,
    when(answers) {
      if (answerCond("Input", answers)) {
        numberOfPercent++;
        return true;
      }
      return false;
    },
  },
];

program.version("1.0.0").description("Puppeter test through given json file");

program
  .command("read <source>")
  .alias("r")
  .description("Reads given Json data")
  .action((source) => {
    const jsonData = readJsonData(source);
    // use if it needed.
  });

program
  .command("test <source>")
  .alias("t")
  .description("Tests the CLI output")
  .action((source) => {
    if (isRequested(source)) {
      var jsonData = null 
      prepJsonData(source).then(value => {
        jsonData = value;
        console.log(jsonData);
        prompt(askRequest).then((answers) => {
          if (answers.isRequested == true) {
            jsonData["isUserWanted"] = true;
            console.log(jsonData);
            prompt(validateElements).then((answers) => {
              console.log(jsonData);
              for (const key in answers.numberOfSelectorsToCheck) {
                if (key == 0)
                  jsonData = storeRequestInfo(
                    answers.numberOfSelectorsToCheck[key],
                    jsonData
                  );
                else
                  jsonData = storeRequestInfo(
                    answers.numberOfSelectorsToCheck[key],
                    jsonData
                  );
              }
              console.info("Saves has stored.");
              jsonData = assignPercentage(numberOfPercent, answers, jsonData);
              console.log("Assigning Selected Indexes");
              jsonData = prepIndex(jsonData, source);
              writeUpdatedFormJson(jsonData);
              commandExec(source);
            });
          }
          else {
            jsonData.isUserWanted = false;
            console.info("Test Starts..");
            commandExec(source);
            }
        });
      });
    } 
    else commandExec(source);

  });

program
  .command("add <source>")
  .alias("a")
  .description("Move json file to under current/package directory")
  .action((source) => {
    moveJsonFile(source);
  });

program
  .command("count  <source>")
  .alias("c")
  .description("Gives the number of click operation on the test")
  .action((source) => {
    getCountOfOperations(source);
  });

program.parse(process.argv);
