#! /usr/bin/env node
const program = require('commander');
const prompt = require('inquirer').createPromptModule();

const {
    readJsonData,
} = require('./index');

const {
    getCountOfOperations
} = require('./options');

const {
    isRequested
} = require('./requestCheck');

const {
    commandExec,
    moveJsonFile
} = require('./exec_command');

const {
    storeRequestInfo,
    storeRequestedPercentages,
    prepJsonData
} = require('./jsonhandler');

/*  
    Command Line Application Flow 
        - When test has started, we search for isRequest true, then we start the puppeteer.
            - If we find isRequest true, we ask user to "do you wanna also check the viability of selectors?" if yes then: 
                - In the order of a, button and input we ask "x anchor selector has found, please write percentage of selector you want to check for viability"
                    - Then in order we do clicks, and check selectors viability. 
                    
*/

const askRequest = [
    {
        type : 'confirm',
        name : 'isRequested',
        message : "In json, you've requested DOM content. Dou you want to check existence of selectors in requested DOM?",
        default : true
    }
]

const validateElements = [
    {
        type : 'checkbox',
        name : 'numberOfSelectorsToCheck',
        message : 'Please select the element(s) you want to check their selectors?',
        choices : ['Anchor', 'Button', 'Input'],
        defult : 'Button'
    },
    {
        type : 'checkbox',
        name : 'percentageOfSelectors',
        message : " What percentage of selectors you want to check their existance for ANCHOR",
        choices : [20, 40, 60, 80, 100],
        defult : 0, 
    },

    {
        type : 'checkbox',
        name : 'percentageOfSelectors',
        message : " What percentage of selectors you want to check their existance for BUTTON",
        choices : [20, 40, 60, 80, 100],
        defult : 0, 
    },
    {
        type : 'checkbox',
        name : 'percentageOfSelectors',
        message : " What percentage of selectors you want to check their existance for INPUT",
        choices : [20, 40, 60, 80, 100],
        defult : 0
    }
]

const getPercentages = [

]

program
    .version('1.0.0')
    .description('Puppeter test through given json file')

program 
    .command('read <source>')
    .alias("r")
    .description('Reads given Json data')
    .action(source => {
        readJsonData(source)
    });

program
    .command('test <source>')
    .alias("t")
    .description('Tests the CLI output')
    .action( (source) => { 
        if(isRequested(source)){
            prompt(askRequest).then(answers => {
                if(answers.isRequested == true){
                    var jsonData = prepJsonData();
                    prompt(validateElements).then(answers => {
                        for (const key in answers.numberOfSelectorsToCheck){
                            if(key == 0)
                            jsonData = storeRequestInfo(answers.numberOfSelectorsToCheck[key], jsonData);
                            else 
                            jsonData = storeRequestInfo(answers.numberOfSelectorsToCheck[key], jsonData);
                        }
                        console.info("Saves has stored.");
                        prompt(getPercentages).then(answers => {
                            for (const key in answers.percentageOfSelectors){
                                if(jsonData["isAnchorWanted"] == true) jsonData = storeRequestedPercentages(answers.percentageOfSelectors[key], "Anchor", jsonData);
                                else if(jsonData["isButtonWanted"] == true) jsonData = storeRequestedPercentages(answers.percentageOfSelectors[key], "Button", jsonData);
                                else jsonData = storeRequestedPercentages(answers.percentageOfSelectors[key], "Input", jsonData);
                            }
                            // Check your TODO on Extension CODE !!!!!!!!
                            console.info(jsonData);
                        });
                    });
                }
            });
        }

      
        //commandExec(source);
        }
    );

program
    .command('add <source>')
    .alias("a")
    .description('Move json file to under current/package directory')
    .action( (source) => { 
        moveJsonFile(source);
        }
    );


program 
    .command('count  <source>')
    .alias('c')
    .description('Gives the number of click operation on the test')
    .action( (source) => {
        getCountOfOperations(source);
    })


program.parse(process.argv);