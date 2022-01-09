function checkInIframe(e) {
    e.preventDefault();


    let url = document.getElementById("url").value;
    const iframeEl = document.getElementById("iframe");

    if (!/^https:/.test(url)) {
        if (/^http:/.test(url)) {
            url = url.replace(/^http:/i, "https:");
        } else {
            url = "https://" + url;
        }
    }

    iframeEl.src = url;
}
const form = document.getElementById("form");
form.addEventListener("submit", checkInIframe);