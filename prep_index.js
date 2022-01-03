// Prepare Selected Indexes which basically look for selectors whether exist on page
const { readJsonData } = require("./index");

function randomization(
  numberToChoose,
  numberOfTotal,
  index,
  choosedIndexes,
  type
) {
  var selectedIndex = 0;
  var tempArray = [];
  while (numberOfTotal > 0) {
    var holder = true;
    while (holder) {
      selectedIndex = Math.floor(Math.random() * numberToChoose) + index;
      holder = tempArray.includes(selectedIndex);
    }
    tempArray.push(selectedIndex);
    numberOfTotal--;
  }
  if (numberOfTotal == 0) {
    if (type == "anchor") choosedIndexes.push({ anchor : tempArray });
    else if (type == "button") choosedIndexes.push({ button : tempArray });
    else choosedIndexes.push({ input : tempArray });
    return choosedIndexes;
  }
}

//

function randomlyChoose(
  numberToChooseA,
  numberOfTotalA,
  index,
  choosedIndexes,
  numberToChooseB,
  numberOfTotalB,
  numberToChooseI,
  numberOfTotalI
) {
  var temp = 3;
  console.log(choosedIndexes);
  while (temp > 0) {
    if (temp == 3) {
      choosedIndexes = randomization(
        numberToChooseA,
        numberOfTotalA,
        index,
        choosedIndexes,
        "anchor"
      );
    }
    else if (temp == 2) {
      choosedIndexes = randomization(
        numberToChooseB,
        numberOfTotalB,
        index + numberOfTotalA,
        choosedIndexes,
        "button"
      );
    } else {
      choosedIndexes = randomization(
        numberToChooseI,
        numberOfTotalI,
        index + numberOfTotalA + numberOfTotalB,
        choosedIndexes,
        "input"
      );
    }
    temp--;
  }
  console.log(choosedIndexes);
  return choosedIndexes;
}

//

function prepIndex(answerjsonData, filename) {
  var total = 0;
  if (answerjsonData.isUserWanted == true) {
    var jsonD = readJsonData(filename);
    const index = jsonD.tests.findIndex((obj) => obj.isFormRequest == true);
    console.log(answerjsonData.choosenIndex);
    answerjsonData.choosenIndex = randomlyChoose(
      answerjsonData.numberOfAnchor,
      answerjsonData.wantedNumberOfAnchor,
      index + 1,
      answerjsonData.choosenIndex,
      answerjsonData.numberOfButton,
      answerjsonData.wantedNumberOfButton,
      answerjsonData.numberOfInput,
      answerjsonData.wantedNumberOfInput
    );
    total +=
      answerjsonData.wantedNumberOfAnchor +
      answerjsonData.wantedNumberOfButton +
      answerjsonData.wantedNumberOfInput;
  }
  return answerjsonData;
}

module.exports = {
  prepIndex,
};
