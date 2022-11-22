var request = require('request');
var fs = require('fs');
const LZString = require("lz-string")

let img_data = "JYWw5g9ALAjArAZgggbHKUIAYYDoBWADmADSiSyLJobYBMBxZ408Sq6mWCjp5rVDrSxRezCm2qdscMf0rsaXFHJYKpwgOyqJgpdgAcOgYulYAnMfVDMMLFck2IMPET5rH+mAzfiTG2x5feU9pGFFgjz0w2UjdU1oYFTj/JxhtFOsvI0zQxMtc6No6e0KEzDpXJhCiip9qqPKIOiCG+IDmiLbU/TpY7qzpOmSBvIqM0drmnMmmugLZjoRS4iA"
let originArr = LZString.decompressFromBase64(img_data).split(',');

function start(i) {
    if (i < originArr.length) {
        let url = 'https://mao.mhtupian.com/uploads/' + originArr[i];
        request({
            url,
            headers: {
                "referer": "https://www.maofly.com/"
            }
        })
        .on("response", (res) => {
            if (res.statusCode != 200) {
                throw new Error(res.statusCode);
            } else {
                console.log("done " + (i + 1));
                start(i + 1);
            }
        })
        .on("error", (err) => {
            console.error(url);
            console.error(err);
        })
        .pipe(fs.createWriteStream('img/' + (i + 1) + '.jpg'));
        console.log('img/' + (i + 1) + '.jpg | ' + url);
    }
}

start(0);


// var url = 'https://mao.mhtupian.com/uploads/img/4610/39406/seemh-001-d77b.jpg';
// request({
//         url,
//         headers: {
//             "referer": "https://www.maofly.com/"
//         }
//     })
//     .on("response", (res) => {
//         console.log(res.statusCode);
//         if (res.statusCode != 200) {
//             throw new Error(res.statusCode);
//         }
//     })
//     .on("error", (err) => {
//         console.error(url);
//         console.error(err);
//     })
//     .pipe(fs.createWriteStream('img/' + 1 + '.jpg'));
// console.log(url + ' done!')