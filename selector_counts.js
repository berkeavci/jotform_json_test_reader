function anchorCount(page){
    const anchorCount = await page.$$eval('a', (anchors) => anchors.length);
    return anchorCount;
}
function buttonCount(page){
    const buttonCount = await page.$$eval('button', (buttons) => buttons.length);
    return buttonCount;
}
function inputCounts(page){
    const inputCounts = await page.$$eval('input', (inputs) => inputs.length);
    return inputCounts;
}





module.exports = {
    anchorCount,
    buttonCount,
    inputCounts
}