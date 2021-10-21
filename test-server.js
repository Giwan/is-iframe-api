const https = require("https");

const handler = () => {
    const options = {
        hostname: process.argv[2],
        port: 443,
        method: "HEAD"
    }

    const newReq = https.request(options, (newRes) => {
        const headers = newRes.headers;
        // console.log("headers: ", headers);

        const xframeoptions = headers["X-Frame-Options"] || headers["x-frame-options"];
        if (xframeoptions && ["DENY", "SAMEORIGIN"].includes(xframeoptions)) {
            console.log("this page does not allow iframing: ", xframeoptions); 
        } else {
            console.log("page allows for iframing: ", xframeoptions);
        }
    });

    newReq.end();
};

handler();