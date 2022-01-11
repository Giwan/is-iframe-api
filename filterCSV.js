/** this reads the CSV list and checks the urls in that list */

const fs = require("fs");
const { readCSV } = require("nodecsv");
const outputFile = "./filteredXFrameOptions.csv";

readCSV("./check_x-frame-options.csv", function (error, data) {
    if (error) {
        throw error;
    }

    fs.writeFile(outputFile, "", error => { if (error) console.error(error); });
    loopOverCSVData(data);
});

function loopOverCSVData(cvsData) {
    let youtubeCount = 0;
    cvsData.forEach(row => {
        const url = row[0];
        if(/youtube\.com/i.test(url)) {
            youtubeCount += 1;
            return;
        }
        
        writeToFile(url);
    }); 
    console.log("youtube links removed: ", youtubeCount);
}

const writeToFile = function (url) {
    fs.appendFile(outputFile, url+"\n", function (error) {
        if (error) console.error(error);
    });
}