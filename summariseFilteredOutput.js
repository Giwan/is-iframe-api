/** this reads the CSV list and checks the urls in that list */

const fs = require("fs");
const { readCSV } = require("nodecsv");

const defaultTargetFile = "./filterdOutput1.csv";

const writeTotal = function(targetFile = defaultTargetFile) {
    readCSV(targetFile, function(error, data) {
        const totalRows = data.length;
        let yesValues = 0, 
        noValues = 0,
        unknown = 0;
        data.forEach((row) => {
            if (row[1] === "unknown") return unknown += 1;
            Boolean(row[1] === "true") 
            ? yesValues += 1
            : noValues += 1;
        });

        const output = `
        Yes: ${yesValues} | ${(yesValues/totalRows)*100}%
        No:  ${noValues} | ${(noValues/totalRows)*100}%
        ?:   ${unknown} | ${(unknown/totalRows)*100}%
        =====
        Total: ${totalRows}
        `

        fs.writeFile("./filteredSummary.txt", output, function(error) {
            if (error) console.error(error);
        }); 
    })
};

writeTotal();

module.exports = writeTotal;