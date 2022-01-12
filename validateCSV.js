/** this reads the CSV list and checks the urls in that list */

const fs = require("fs");
const { readCSV } = require("nodecsv");
const handler = require("./internalHandler");

const sourceFile = "./filteredXFrameOptions.csv";
const targetFile = "./filterdOutput1.csv";

readCSV(sourceFile, function (error, data) {
    if (error) {
        throw error;
    }

    fs.writeFile(targetFile, "", error => { if (error) console.error(error); });
    loopOverCSVData(data);
});

async function loopOverCSVData(cvsData) {
    const promiseList = cvsData.map(async (row) => await checkUrl(row[0]));
    const values = await Promise.all(promiseList);
    values.forEach(isIframe => writeToFile(isIframe))
    console.log("finished");
}

const checkUrl = async function (url) {
    if (/youtube\.com/i.test(url)) {
        return {
            iframe: true,
            url: url
        }
    }
    return await handler(url);
}

const writeToFile = async function (isIframe) {
    // const isIframe = await checkUrl(url);
    const data = `${isIframe.url},${isIframe.iframe}\n`;
    fs.appendFile(targetFile, data, function (error) {
        if (error) console.error(error);
    });
}