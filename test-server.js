/**
 * Run this file with `node test-server.js www.mathsisfun.com/place-value.html
 * to check that url. 
 */

const https = require("https");
const app = require("./api/index.js");

const handler = () => {
    const url = new URL(process.argv[2]);

    const options = {
        hostname: url.hostname,
        port: 443,
        method: "HEAD"
    }

    const newReq = https.request(options, (newRes) => {
        
    });
    newReq.query = {
        url
    }
    app(newReq, { setHeader: () => {}, json: (data) => console.log("json response: ", data) });

    newReq.end();
};

handler();