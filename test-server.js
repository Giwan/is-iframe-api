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
        const headers = newRes.headers;
        // console.log("headers: ", headers);

        // const xframeoptions = headers["X-Frame-Options"] || headers["x-frame-options"];
        // if (xframeoptions && ["DENY", "SAMEORIGIN"].includes(xframeoptions)) {
        //     console.log("this page does not allow iframing: ", xframeoptions); 
        // } else {
        //     console.log("page allows for iframing: ", xframeoptions);
        // }

    });
    newReq.query = {
        url: "www.mathsisfun.com/place-value.html"
    }
    app(newReq, { setHeader: () => {}, json: (data) => console.log("json response: ", data) });

    newReq.end();
};

handler();