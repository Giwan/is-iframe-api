/**
 * The point of this is to test the node-fetch 
 * package and see if it can help to get the headers.
 */

const fetch = require("node-fetch"); 
const { doesUrlAllowIframe, prefixHTTPS } = require("./api/helper");
const testUrlList = require("./testUrlList");

const processHeaders = function(headers, options) {
    return jsonResponse = {
        url: options.hostname,
        iframe: doesUrlAllowIframe(headers)
    }
}

const X_FRAME_OPTIONS = "X-Frame-Options"; 
const CONTENT_SECURITY_POLICY = "content-security-policy";

const handler = async function(urlTarget) {
    const url = new URL(urlTarget);
    const options = {
        hostname: url.hostname
    }
    const resp = await fetch(url); 
    const headers = resp.headers;

    const formattedHeaders = {
        [CONTENT_SECURITY_POLICY]: headers.get(CONTENT_SECURITY_POLICY),
        [X_FRAME_OPTIONS]: headers.get(X_FRAME_OPTIONS)

    }

    const response = processHeaders(formattedHeaders, options);

    console.log({response});
    return response;
}

// handler("https://bbc.co.uk");
// handler("http://www.pbslearningmedia.org");
// handler("https://phys.org");
// new Set(testUrlList).forEach(url => handler(prefixHTTPS(url)));

module.exports = handler;