const request = require('request');
const fs = require('fs');
const util = require('util');

const proxy_ip = '127.0.0.1';
const proxy_port = '7890';
const proxy = util.format('http://%s:%d', proxy_ip, proxy_port);

// https://www.dmhua8.com/manhua/dongwurenjian/1233079.html

let cookie = "";
let referer = "";
const FROM_FILE_INDEX = 152;

function readHTML() {
    const fileContents = fs.readFileSync('index.html', 'utf-8');
    const match = fileContents.match(/var chapterImages = (\[.*?\]);/);
    if (match) {
        const chapterImages = JSON.parse(match[1].replace(/\\/g, ''));
        downloadImages(chapterImages, 0);
    } else {
        console.error('no chapterImages found');
    }
}

function downloadImages(images, index) {
    if (index >= images.length) {
        console.log(index + ' images downloaded successfully');
        process.exit(0);
    }
    const url = images[index];
    const filename = `${FROM_FILE_INDEX + index}.jpg`;
    const filepath = `img/${filename}`;
    const headers = {
        "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
        "referer": referer,
        "cookie": cookie,
    };
    const options = {
        url,
        proxy,
        headers,
    };
    request(options)
        .on("response", (res) => {
            if (res.statusCode != 200) {
                console.error(`Failed to download ${filename}`);
                process.exit(1);
            } else {
                console.log(`done ${filename}`);
                downloadImages(images, index + 1);
            }
        })
        .on("error", (err) => {
            console.error(`Failed to download ${filename}`);
            console.error(url);
            console.error(err);
            process.exit(1);
        })
        .pipe(fs.createWriteStream(filepath));
    console.log(`${filepath} | ${url}`);
}

readHTML();