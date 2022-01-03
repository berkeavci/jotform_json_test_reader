const {
    storeRequestedPercentages,
} = require('./jsonhandler');

function answerCond(cond, answers){
    for (const key in answers.numberOfSelectorsToCheck){
        console.info(answers.numberOfSelectorsToCheck[key]);
        if(answers.numberOfSelectorsToCheck[key] == cond) // cond = "Anchor"
            return true;
    }
    return false;
}

function assignPercentage(numberOfPerc, answers, jsonData){
    // Assigning Progress we change the WANTED selectors
    var isAnchorAssigned = false;
    var isButtonAssigned = false;
    var isInputAssigned = false;

    while (numberOfPerc != 0) {
        if (
          answers.percentageOfAnchor != undefined &&
          isAnchorAssigned == false
        ) {
          jsonData = storeRequestedPercentages(
            answers.percentageOfAnchor,
            "Anchor",
            jsonData
          );
          isAnchorAssigned = true;
        } else if (answers.percentageOfButton != undefined && isButtonAssigned == false) {
          jsonData = storeRequestedPercentages(
            answers.percentageOfButton,
            "Button",
            jsonData
          );
          isButtonAssigned = true;
        } else if (answers.percentageOfInput != undefined && isInputAssigned == false) {
          jsonData = storeRequestedPercentages(
            answers.percentageOfInput,
            "Input",
            jsonData
          );
          isInputAssigned = true;
      }
        numberOfPerc--;
      }
      return assignNewWantedNumbers(jsonData);
}

function assignNewWantedNumbers(jsonData){
  jsonData.wantedNumberOfAnchor = Math.round(jsonData.numberOfAnchor * jsonData.percentageOfAnchor / 100);
  jsonData.wantedNumberOfButton = Math.round(jsonData.numberOfButton * jsonData.percentageOfButton / 100);
  jsonData.wantedNumberOfInput = Math.round(jsonData.numberOfInput * jsonData.percentageOfInput / 100);
  console.log(jsonData);
  return jsonData;
}

module.exports = {
    answerCond,
    assignPercentage
}