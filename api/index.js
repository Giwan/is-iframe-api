// const http = require("http");
// const https = require("https");
const { http, https } = require("follow-redirects");
const { doesUrlAllowIframe, prefixHTTPS } = require("./helper");

const allowCors = fn => async (req, res) => {
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT,HEAD');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );
    if (req.method === 'OPTIONS') {
        res.status(200).end()
        return
    }
    return await fn(req, res);
}

const processHeaders = function (newResponse, oldResponse, options) {
    const headers = newResponse.headers;

    const jsonResponse = {
        url: options.hostname,
        iframe: doesUrlAllowIframe(headers)
    };

    if (oldResponse.log) {
        oldResponse.log(jsonResponse);
    } else oldResponse.json(jsonResponse);
}

const handler = (req, res) => {

    const url = new URL(prefixHTTPS(req.query.url));

    const options = {
        hostname: url.hostname,
        port: 80,
        method: "HEAD"
    }

    try {
        const newReq = http.request(options, (newRes) => {         
            processHeaders(newRes, res, options);

        });
        newReq.end();

    } catch (e) {
        res.json({
            url: options.hostname,
            iframe: false,
            error: e?.message || e
        })
        newReq.end();
    }

};

module.exports = allowCors(handler);