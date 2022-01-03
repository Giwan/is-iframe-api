const { doesUrlAllowIframe, isCSPAllowed } = require("./api/helper");

console.log("Starting test"); 

console.assert(doesUrlAllowIframe(), "Empty headers should mean that iFrame is allowed");
console.assert(doesUrlAllowIframe({}), "Empty headers should mean that iFrame is allowed");


console.assert(!(doesUrlAllowIframe({
    "X-Frame-Options": "DENY"
})), "iFrame should be denied but is not");

console.assert(isCSPAllowed({
    "content-security-policy": "iframe"
}), "iFrame is allowed through CSP but the test fails.");

console.assert(isCSPAllowed({
    "x-content-security-policy": "iframe"
}), "iFrame is allowed through CSP (x-content...) but the test fails.");

console.assert(!isCSPAllowed({
    "content-security-policy": "none"
}), "iFrame is not allowed through CSP but the test fails.");

console.assert(doesUrlAllowIframe({
    "x-content-security-policy": "iframe"
}), "iFrame is allowed through CSP (x-content...) but the test fails.");

console.assert(!doesUrlAllowIframe({
    "x-content-security-policy": "none"
}), "iFrame is allowed through CSP (x-content...) but the test fails.");

console.assert(!doesUrlAllowIframe({
    "x-content-security-policy": "frame-ancestors 'self' *.specless.io *.specless.tech http://*.seo.aws.about.com https://*.seo.aws.about.com http://*.dotdash.com https://*.dotdash.com *.thoughtco.com"
}), "iFrame is not allowed through CSP but the test fails.");

console.log("Finished");