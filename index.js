const fs = require("fs");
const path = require("path");


function readJsonData(filename){
  fs.readFile(path.join(__dirname , filename) , (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    jsonData = JSON.parse(data);
    console.log(jsonData);
    return jsonData;
  });
}

function testJson(jsonData) {
  const testFile = require('./json.test').default;
  testFile.testingFunc(jsonData);
  
}



  //   Object.entries(temporary_JSON).forEach((entry) => {
  //     let key = entry[0]; // gives us the first, second clicks...
  //     let value = entry[1];
  //     console.log(value[0].type);
  //     if(key != null){
  //         switch (value[0].type) {
  //             case "click":
  //               describe('${value[0]}.task', () =>{
  //                 test('should go to jotform', async () => {
  //                   await page.goto(URL[0]);
  //                   await expect(page).toClick('a[data-name="login"]');
  //                   await expect(page).toClick('button.xcl-button-gl.test_gl_login');
  //                   await expect(page).toClick('button.newModalInlineButton.close.jfHeader-authForm-close.locale-data-aria-label');
  //                   await page.type('.sb-input-berkay-test', "Outside");
  //                   // await browser.close();
  //                 }, timeout);
  //               })
  //               case "input":
  //                 break;
  //             default:
  //                 break;
  //         }

  //     }

  //   });

module.exports = {
  readJsonData,
  testJson,
};

/* Template needs : 
  initial URL to execute,
  describtion, which is not needed at this moment
  title, document.title
*/

// document.querySelector('a').href


// Wait for DOM to load

//   // Optional Page by page testing
//   beforeEach( async () => {
//     page = await browser.newPage();
//   });

//   afterEach( async () => {
//     await page.close();
//   });

// beforeAll( async () => {
//     await page.goto(URL[0], {waitUntil: 'domcontentloaded'});
// });

// const temporary_JSON = {
//     1: [
//       {
//         type: "click",
//         previous_title: "Example Domain",
//         after_title: "IANA-managed Reserved Domains",
//         target: "a",
//         url: "https://www.iana.org/domains/example",
//       },
//     ],
//   };

// var jsonFile = JSON.parse(temporary_JSON);

//   {
//     "id": "uuid4",
//     "created_date": "date",
//     "extension" : {
//         "version": ""
//     },
//     "tests": [
//         {
//             "data" :  "",
//             "className": "",
//             "parentElement": ""
//         },
//         {
//             "data" :  "",
//             "className": "",
//             "parentElement": ""
//         }
//     ]
// }
// console.log(jsonFile.type);
//   jsonFile.tests.forEach()
//   Object.entries(temporary_JSON).forEach((entry) => {
//     let key = entry[0]; // gives us the first, second clicks...
//     let value = entry[1];
//     console.log(value[0].type);
//     if(key != null){
//         switch (value[0].type) {
//             case "click":
//               describe('${value[0]}.task', () =>{
//                 test('should go to jotform', async () => {
//                   await page.goto(URL[0]);
//                   await expect(page).toClick('a[data-name="login"]');
//                   await expect(page).toClick('button.xcl-button-gl.test_gl_login');
//                   await expect(page).toClick('button.newModalInlineButton.close.jfHeader-authForm-close.locale-data-aria-label');
//                   await page.type('.sb-input-berkay-test', "Outside");
//                   // await browser.close();
//                 }, timeout);
//               })
//               case "input":
//                 break;
//             default:
//                 break;
//         }

//     }

//   });

//   return new Promise((resolve, reject) => {
//     //await page.goto(URL[0]);
//     console.log(value[0].target);
//     //const moreInfo = await page.$('[a]');
//     page.waitForSelector('a[data-name="login"]').then(click_button => {
//       page.click(click_button)
//         .then(() => resolve())
//         .catch(err => reject(err))
//     }).catch(err => {
//       console.error(err)
//       reject(err)
//     })
//   })
