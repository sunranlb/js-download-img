var request = require('request');
var fs = require('fs');
var util = require('util');

let proxy_ip = '127.0.0.1';
let proxy_port = '7890';
let proxy = util.format('http://%s:%d', proxy_ip, proxy_port);

const SCALE = 0;
let si = 0; // start i     0   10  100
let sum = 1000;   // num
let cookie = "";
let referer = "";
let url1 = "";
let url2 = "";
function readHAR() {
    const fileContents = fs.readFileSync('/Users/sr/Downloads/4.har', 'utf-8');
    const d = JSON.parse(fileContents);
    const entries = d.log.entries;
    if (entries) {
        try {
            entries.forEach((entry) => {
                if (entry.request.url.indexOf('us.archive.org') > 0) {
                    let url = entry.request.url;
                    let idx = url.indexOf('.jp2&');
                    url1 = url.substring(0, idx - 4) + '000';
                    url2 = url.substring(idx);
                    let len2 = url2.length;
                    url2 = url2.substring(0, len2 - 10) + SCALE + url2.substring(len2 - 9);
                    entry.request.headers.forEach((h) => {
                        if (h.name == 'cookie') {
                            cookie = h.value;
                        } else if (h.name == 'referer') {
                            referer = h.value;
                        }
                    });
                    throw "sss";
                }
            })
        } catch (e) {
            if (e != "sss") {
                throw e;
            } else {
                return true;
            }
        }
    }
    return false;
}

function start(i) {
    if (i < si + sum) {
        let sub = Math.floor(Math.log10(i));
        let url = url1.substring(0, url1.length - sub) + i + url2;
        request({
            url,
            proxy,
            headers: {
                "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                "referer": referer,
                "cookie": cookie,
            }
        })
            .on("response", (res) => {
                if (res.statusCode != 200) {
                    throw new Error(res.statusCode);
                } else {
                    console.log("done " + (i));
                    start(i + 1);
                }
            })
            .on("error", (err) => {
                console.error(url);
                console.error(err);
            })
            .pipe(fs.createWriteStream('img/' + i + '.jpg'));
        console.log('img/' + i + '.jpg | ' + url);
    }
}

if (readHAR()) {
    start(si);
} else {
    console.error('no header found');
}