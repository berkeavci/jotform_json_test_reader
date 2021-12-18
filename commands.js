#! /usr/bin/env node
const program = require('commander');
const prompt = require('inquirer');

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

/*  
    Command Line Application Flow 
        - When test has started, we search for isRequest true, then we start the puppeteer.
            - If we find isRequest true, we ask user to "do you wanna also check the viability of selectors?" if yes then: 
                - In the order of a, button and input we ask "x anchor selector has found, please write percentage of selector you want to check for viability"
                    - Then in order we do clicks, and check selectors viability. 
                    
*/

const questions = [

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
        if (isRequested(source)) {
            console.info("DOM Content request has found. Do you want to check existence of selectors?")
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