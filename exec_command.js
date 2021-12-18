function commandExec(source){
    var result = require('child_process').execSync(`TEST_ENV_VAR=${source} npm run test --prefix ${__dirname}`, {stdio: "inherit"}); 
    console.info(result);
}

function moveJsonFile(source){
    require('child_process').exec(`mv ${source} ${__dirname}`);
    console.info("Json Successfully Moved")
}

module.exports = {
    commandExec,
    moveJsonFile
}