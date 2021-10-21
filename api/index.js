const https = require("https");

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

const handler = (req, res) => {
    const options = {
        hostname: req.query.url.replace(/^http.:\/\//i, ""),
        port: 443,
        method: "HEAD"
    }

    const newReq = https.request(options, (newRes) => {
        const headers = newRes.headers;
        const xframeoptions = headers["X-Frame-Options"] || headers["x-frame-options"];
        res.json({
            url: options.hostname,
            iframe: !Boolean(xframeoptions && ["DENY", "SAMEORIGIN"].includes(xframeoptions))
        });
    });

    newReq.end();
};

module.exports = allowCors(handler);