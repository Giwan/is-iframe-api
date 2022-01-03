/**
 * Run this file with `node test-server.js https://www.mathsisfun.com/place-value.html`
 * to check that url. 
 */
const http = require("http");
const https = require("https");
const app = require("./api/index.js");
// const demoUrl = "www.mathsisfun.com/place-value.html";
// const demoUrl = "http://www.jpl.nasa.gov/";
const demoUrl = "https://www.dkfindout.com";
const { prefixHTTPS } = require("./api/helper");

const handler = () => {
    const url = new URL(prefixHTTPS(process.argv[2] || demoUrl));

    const options = {
        hostname: url.hostname,
        port: 80,
        method: "HEAD"
    }

    const newReq = http.request(options); // create the request object
    newReq.query = { url }; // add the query parameter

    const newOptions = { 
        setHeader: () => { }, 
        json: () => { }, 
        log: (jsonResponse) => console.log("json response: ", JSON.stringify(jsonResponse))
    };
    
    // Call app with the new request
    app(newReq, newOptions);

    newReq.end();
};

handler();