# Jotform Json Test Reader Command Line Application

Jotform Command Line application to read specific json file that downloaded via [extension](https://github.com/berkeavci/JotFormTrackerExtension) and co puppeteer test on.

## Commands 

* Help command

``` 
  jotform-test --help 
  # to see descriptions of commands
```
* Add command

``` 
  jotform-test add|a <filename>
  # Move json file to command line application local directory
```
* Test Command

``` 
  jotform-test test|t <filename> 
  # Start Tests.
```

## Questions 
> ***If DOM content requested - ``` "isFormRequest" : true ``` found application prompt questions to user.***

 - First question is ask user about want to test requested DOM content existence. 
 
      - ``` yes ``` Ask user whether ***Anchor, Button or Input*** wanted.
      
          - Ask user about percentages of Anchor, Button or Input
          
              - Do click test then, check selector existence randomly on given percentages.
      
      - ``` no ``` Starts testing without checking DOM content on json.
      
* Json format of answers ( in order to have a persistent data for testing purposes ) : 

```
{
    "isAnchorWanted" : false,
    "isButtonWanted" : false,
    "isInputWanted" : false,
    "percentageOfAnchor" : 0,
    "percentageOfButton" : 0,
    "percentageOfInput" : 0
    "numberOfAnchor" : 0,
    "numberOfButton" : 0,
    "numberOfInput" : 0, 
    "wantedNumberOfAnchor" : 0,
    "wantedNumberOfButton" : 0,
    "wantedNumberOfInput" : 0,
    "choosenIndex" : [                    
    ]
}
```
```
choosenIndex : Randomly choosed indexes in the test.json

percentageOfAnchor : Given percentage by user 

numberOfAnchor : Number of anchor in the test.json

wantedNumberOfAnchor : numberOfAnchor * percentageOfAnchor / 100
```


