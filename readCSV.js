/** this reads the CSV list and checks the urls in that list */

const fs = require("fs");
const { readCSV } = require("nodecsv");
const fetch = require("node-fetch");
const http = require("http");

readCSV("./check_x-frame-options.csv", function (error, data) {
    if (error) {
        throw error;
    }

    fs.writeFile("./output.csv", "", error => { if (error) console.error(error); });
    loopOverCSVData(data);
});

function writeTotal(totalYes, totalNo) {
    const total = (totalYes + totalNo);
    console.log("=====");
    console.log("yes: ", totalYes, (totalYes / total) * 100 + "%");
    console.log("No: ", totalNo, (totalNo / total) * 100 + "%");
    const summary = `
    Yes: ${totalYes} | ${(totalYes / total) * 100}%
    No : ${totalNo} | ${totalNo / total * 100}%
    ===============
    Total: ${total}`
    fs.writeFile("./outputSummary.txt", summary, (error) => {
        if (error) console.error(error);
    });
}

function loopOverCSVData(csvData) {
    let i = 0;
    let totalYes = 0, totalNo = 0;

    function updateCount(isIframe) {
        isIframe.iframe ? totalYes += 1 : totalNo += 1;
    }

    function handleLast() {
        writeTotal(totalYes, totalNo);
    }

    async function loop() {
        if (i >= csvData.length) return handleLast();

        const row = csvData[i];
        const url = row[0];

        const isIframe = await checkUrl(url);
        writeToFile(isIframe, url);
        updateCount(isIframe);

        i += 1;
        loop();
    }
    loop();
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

const writeToFile = function (isIframe, url) {
    const data = `${url},${isIframe.iframe}\n`;
    fs.appendFile("./output.csv", data, function (error) {
        if (error) console.error(error);
    });
}