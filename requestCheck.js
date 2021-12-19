var fs = require('fs');
var path = require('path');

function isRequested(filename) {
  const jsonFile = fs.readFileSync(path.join(__dirname, filename), 'utf-8');
  const jsonData = JSON.parse(jsonFile);
  if(jsonData.tests.some(element => element.isFormRequest === true )){
    return true;
  }
  return false;
}

module.exports = {
  isRequested,
}
