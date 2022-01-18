
/**
 * The parent site will run on https so every site be 
 * loaded in the iFrame should also have SSL (https)
 * @param {URL} url The URL that should be formatted
 * @returns URLString   Containing the https
 */
const ensureHttps = (url) => {
    if (!/^https:/.test(url)) {
        if (/^http:/.test(url)) {
            url = url.replace(/^http:/i, "https:");
        } else {
            url = "https://" + url;
        }
    }
    return url;
}

/**
 * Update the `src` of the iframe to loaded
 * the page provided.
 * @param {URL} url 
 */
const populateIframeSrc = function(url) {
    url = ensureHttps(url);
    const iframeEl = document.getElementById("iframe");

    iframeEl.src = url;
    document.getElementById("url").value = url;
}

/**
 * 
 * @param {Event} e The event provided by the <form>
 */
function checkInIframe(e) {
    e.preventDefault();


    const url = document.getElementById("url").value;
    populateIframeSrc(url);
}

/**
 * ################ page events ################
 */
const form = document.getElementById("form");
form.addEventListener("submit", checkInIframe);

/**
 * Check if a url parameter has been provided and 
 * use it to populate the iframe.
 * @returns void
 */
window.onload = function() {
    const searchParams = new URLSearchParams(window.location.search);
    const url = searchParams.get("url");
    if (!url) return;

    populateIframeSrc(url);
}