/**
 * Run this file with `node test-server.js https://www.mathsisfun.com/place-value.html`
 * to check that url. 
 */

const https = require("https");
const app = require("./api/index.js");
const demoUrl = "www.mathsisfun.com/place-value.html";
const { prefixHTTPS } = require("./api/helper"); 

const handler = () => {
    const url = new URL(prefixHTTPS(process.argv[2] || demoUrl));

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

    const newOptions = { setHeader: () => {}, json: (data) => console.log("json response: ", data) };
    app(newReq, newOptions);

    newReq.end();
};

handler();