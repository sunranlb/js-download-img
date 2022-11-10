var request = require('request');
var fs = require('fs');
const LZString = require("lz-string")

let img_data = "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";
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
                // start(i + 1);
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

start(121);
// start(0);


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