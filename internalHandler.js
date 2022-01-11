/**
 * The point of this is to test the node-fetch 
 * package and see if it can help to get the headers.
 */

const fetch = require("node-fetch");
const { doesUrlAllowIframe, prefixHTTPS } = require("./api/helper");

/**
 * This is a security risk normally but 
 * in this case since only the headers are being
 * checked it's should not be an issue. 
 * */ 
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0; 


const processHeaders = function (headers, options) {
    return {
        url: options.href,
        iframe: doesUrlAllowIframe(headers)
    }
}

const X_FRAME_OPTIONS = "X-Frame-Options";
const CONTENT_SECURITY_POLICY = "content-security-policy";

const fetchUrlHeaders = function(url) {
    return fetch(url, {
        method: "HEAD",
        rejectUnauthorized: false,
        timeout: 2500,
        redirect: "follow"
    });
}

const handler = async function (urlTarget) {
    const url = new URL(prefixHTTPS(urlTarget));
    const options = {
        hostname: url.hostname,
        href: url.href
    }

    let resp; 
    
    try {
        const httpsURL = new URL(prefixHTTPS(urlTarget, true));
        resp = await fetchUrlHeaders(httpsURL);
    } catch(err) {
        return {
            url: urlTarget,
            iframe: false
        }
    }

    const headers = resp.headers;

    const formattedHeaders = {
        [CONTENT_SECURITY_POLICY]: headers.get(CONTENT_SECURITY_POLICY),
        [X_FRAME_OPTIONS]: headers.get(X_FRAME_OPTIONS)

    }

    return processHeaders(formattedHeaders, options);
}

module.exports = handler;