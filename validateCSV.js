/** this reads the CSV list and checks the urls in that list */

const fs = require("fs");
const { readCSV } = require("nodecsv");
const fetch = require("node-fetch");

const sourceFile = "./filteredXFrameOptions2.csv";
const targetFile = "./filterdOutput.csv";

readCSV(sourceFile, function (error, data) {
    if (error) {
        throw error;
    }

    fs.writeFile(targetFile, "", error => { if (error) console.error(error); });
    loopOverCSVData(data);
});

function loopOverCSVData(cvsData) {
    cvsData.forEach((row, index, arr) => {
        const url = row[0];
        const isLast = index === arr.length
        writeToFile(url, isLast);
    });
}

const checkUrl = async function (url) {
    if (/youtube\.com/i.test(url)) {
        return {
            iframe: true,
            url: url
        }
    }

    return await (await fetch("http://localhost:8888/.netlify/functions/is-iframe?url=" + url)).json();
}

const writeToFile = async function (url, isLast) {
    const isIframe = await checkUrl(url);
    const data = `${url},${isIframe.iframe}\n`;
    fs.appendFile(targetFile, data, function (error) {
        if (error) console.error(error);
    });
    if (isLast) {
        writeTotal();
    }
}