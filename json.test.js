import { anchorCount, buttonCount, inputCounts } from './selector_counts';
import { readFileSync } from "fs";
import f from "./index";


const timeout = 50000;
console.log(process.env.TEST_ENV_VAR);
const json = readFileSync(process.env.TEST_ENV_VAR, 'utf-8');
const jsonD = JSON.parse(json);


function getJsonData(){
  return jsonD;
}

beforeAll( async () => {
  await page.goto(URL[0], {waitUntil: 'domcontentloaded'});
});

async function linkHandler(link){
  if(link == URL[0]) return true;
  await page.goto(link, {waitUntil: 'domcontentloaded'});
}

function linkExtraction(){

}

var count = 0;
jsonD.tests.forEach(element => {
  console.log(element.type);
  if(element.type != "input"){
  describe("test", () => {
    test(
      "should go to jotform",
      async () => {
        await expect(page).toClick(element.data);
      },
      timeout
    );
  });
  }else{
    describe("test", () => {
    test(
      "should input",
      async () => {
        if (element.value === 'link'){
        }
        await page.waitForSelector(element.data);
        await expect(page).toClick(element.data);
        await page.keyboard.sendCharacter(element.value);
      });
  });
  }
  count++;
});


export default {
  getJsonData,
};




// const getData = (file) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(file, (err, data) => {
//       if (err) return reject(err);
//       try {
//         const json = JSON.parse(data);
//         resolve(json);
//       } catch (E) {
//         reject(E);
//       }
//     })
//   })
// }


// try {
//   await page.waitForSelector(selector, { timeout: 5000 })
//   // ...
// } catch (error) {
//   console.log("The element didn't appear.")
// }
