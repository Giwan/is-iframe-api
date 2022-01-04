
/**
 * Helper function to easily get the CSP headers
 * @param {Object} headers 
 * @returns Array
 */
const getCSP = function(headers) {
    const csp = headers['content-security-policy'] || ""; 
    const cspx = headers['x-content-security-policy'] || ""; 
    return [csp, cspx];
}

/**
 * Check if the iframe is explicitly being allowed
 * by the CSP header. 
 * @param {Object} headers 
 * @returns Boolean
 */
const isCSPAllowed = function(headers) {
    const [ csp, cspx ] = getCSP(headers);
    const reg = new RegExp("iframe", "i");

    const cspIframeAllowed = reg.test(csp) || reg.test(cspx); 

    if (cspIframeAllowed) return cspIframeAllowed;

}

/**
 * Check explicitly if the iframe is being 
 * blocked by the content security policy (CSP)
 * @param {Object} headers 
 * @returns Boolean
 */
const isCSPBlocked = function(headers) {
    const [ csp, cspx ] = getCSP(headers);

    // no csp is specified
    if (!(csp || cspx)) return false;

    const reg = new RegExp("none", "i");
    if (reg.test(csp) || reg.test(cspx)) {
        return true;
    }

    const reg2 = new RegExp("frame-ancestors 'self'", "i");
    if (reg2.test(csp) || reg2.test(cspx)) {
        return true;
    }

}

/**
 * Combines the functions from above to 
 * indicate if the site can be iframed or not. 
 * @param {Object} headers 
 * @returns Boolean
 */
const doesUrlAllowIframe = (headers) => {

    if (!headers) return true; // empty headers means Iframe is allowed
    if (Object.keys(headers).length < 1) return true; // no keys means it's also empty

    if (isCSPAllowed(headers)) return true;
    if (isCSPBlocked(headers)) return false; // false if the CSP is explicitly blocked

    const xframeoptions = headers["X-Frame-Options"] || headers["x-frame-options"];
    const xframeAllow = !Boolean(xframeoptions && ["DENY", "SAMEORIGIN", "ALLOW-FROM"].includes(xframeoptions)); 
    
    return xframeAllow;

}

const prefixHTTPS = (url, isSSL) => {
    if (/^http.?:\/\//i.test(url)) return url;
    if (isSSL) return "https://"+url;
    return "http://"+url;
}

module.exports = {
    doesUrlAllowIframe,
    isCSPAllowed,
    prefixHTTPS
}