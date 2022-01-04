const fetch = require("node-fetch");
const { Headers } = require("node-fetch");

var myHeaders = new Headers();
myHeaders.append("Connection", "keep-alive");
myHeaders.append("Cache-Control", "max-age=0");
myHeaders.append("sec-ch-ua", "\" Not A;Brand\";v=\"99\", \"Chromium\";v=\"96\", \"Google Chrome\";v=\"96\"");
myHeaders.append("sec-ch-ua-mobile", "?0");
myHeaders.append("sec-ch-ua-platform", "\"macOS\"");
myHeaders.append("Upgrade-Insecure-Requests", "1");
myHeaders.append("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.110 Safari/537.36");
myHeaders.append("Accept", "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9");
myHeaders.append("Sec-Fetch-Site", "none");
myHeaders.append("Sec-Fetch-Mode", "navigate");
myHeaders.append("Sec-Fetch-User", "?1");
myHeaders.append("Sec-Fetch-Dest", "document");
myHeaders.append("Accept-Language", "en-GB,en-US;q=0.9,en;q=0.8,nl;q=0.7");
myHeaders.append("Cookie", "_abck=5ADAA7E125930E4092F1CDF0343C958F~-1~YAAQjlozuPcbWbV9AQAA1ikPJgf/Z0lpOY8JF+jwvKRDAPp7eEROc6iBIv2odpZDkkttyEfujYt0bW0o5b/PJcGIHCKQgk7jMAZeuUZMypwHoZhNkYbLgW5BbgIZBkzsg6lC+OeuZw8QYeOlkwPrAa3VidM/SC92fMKuSrj+5kIwKyKzZ7KzCjEZUxtahQDZokSvnLG2kadacM/fOFy03YsGtHkVxeSlYTNBMoEpXWnpvbwQzKHV7S2w4q5fSwo8gqHAiMnyViqpM5PpCNw3y1nV+rhKMUSJAWFxANI0SmZd0nQ8bdLrlvWOE6Bpq3WXUDSgJbwhrXcof4ogLmzYHZRaiOs0aWhYNk/CxDDvMA==~-1~-1~-1; ak_bmsc=72942159A623C6641A93FA9886A97051~000000000000000000000000000000~YAAQjlozuPgbWbV9AQAA1ikPJg6m4q4T5LA1C0mD4oGk/LEvY3S4+3+F1I2XsR8VdZEPpftXx1Y75w555wKohqWYE1v7olt/SNIxrYb6RjqiL9wPyd43lE55pA0yrHAA/IgpPZymiuPX7PRqsSJGjpo2iZwkg72YTuaDnWkfjzOChtbO7D47XCVuaCuichpq1GclL4nKpwxQzSHz3wjRfQooVySqroYmjeCALMRZ5ItC/alEPyHtbj1p4yuVPEDuc5CtS4k9bLDijH6DbCuoi5QJxcovF9vCkFQJk61L6dw9L0CXEIQEKN9qtEda/DhU/NDZ+ydn2LvhXPWf+zM=; bm_mi=96E8763443D582F9E54AAEF471294646~4h/9jUVz/QvDczvcMykabLtzMo5aLygp92MVSI3TjmIAwQHNrle0tnwR1gqLD6Jhxi71E9zYlleD3qFAGLa2XgNPXWXMiHttIobysftOxWqWOAp423LG4adwYfy9HbC1w5B9b1W5Ukt+jRA2tze7gnse3b40O5/JELE03vG72NegqNAxOZ/CQtFQd9ybhRd/bBAQfI51KvEMEpXnNmUHIkbON/VlP9wwC8vWTFSKw84=; bm_sv=FC04D5047E5134A4BF28B2670EDDB56A~hrmSzY//v5pNSj2QmRsyVMa79CMrvZWgCn8VI/Dq+PSIrfm1G0n4j97N2Ju4htHR1ReQ+Wm4Tfb+XrdEZghk1P6Gglrr8zCwLd/9ZbST0TSgvbPA7UhA+/AI3Q/VaoXy4Vd+sg275e96aC3rTVbKbD5K8UkujwEhRp0I7JhbbeQ=; bm_sz=46FFDE3630D90465ADB24DE553AB50DB~YAAQjlozuPkbWbV9AQAA1ikPJg4HH4v0Nz5fFt0+wv1OSFrK8wpWnqdd67+ZVK6dZuHqxb1AEvCp4q42lcipq2ckU+QakbOj5MwzKc6FQgaKYkVY8TCZdiMtytYknGwPik7VfFgFYOqiJdxWkCq3/jhDCedbnKQ7duJIR4ogOE75Ccy1ORUszSQl4gGOt90i+C6YYyjUuUIbbf6rad69y6Ognx8cpmbGgGpRw01Fqd98uYR6Yhfy6JQ4eJRNQxahaXR7h+eM0rji0r1wDv2MABx6SwZEi1ZMTQ1QV/f5exqNR1sh1cHsoDEzlw==~3618625~4403254");

var requestOptions = {
  method: 'HEAD',
  headers: myHeaders,
  redirect: 'follow'
};

fetch("http://learnenglish.britishcouncil.org", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));