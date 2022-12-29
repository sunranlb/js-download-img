import request from 'request';
import fs from 'fs';

function start(g, i, j) {
    let name = '5-' + i + '-' + j;
    // https://www.encyclopedia-titanica.org/titanic-deckplans/boat-deck/TileGroup0/5-10-2.jpg
    let url = 'https://www.encyclopedia-titanica.org/titanic-deckplans/boat-deck/TileGroup' + g + '/' + name + '.jpg';
    request({
        url,
        // proxy,
        headers: {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6",
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
            // "referer": "https://archive.org/details/anatomyoftitanic0000mccl/page/63/mode/1up",
            // "cookie": "donation-identifier=65da4f8da4c14fbc5a7cc3f06e36ced1; abtest-identifier=84ac2b71bb718c9e5b584529ae220c2b; donation=x; test-cookie=1; br-loan-anatomyoftitanic0000mccl=1; PHPSESSID=flaq0p46458f35c36ja8lq3o26; logged-in-sig=1702829491%201671293491%20aA26DcFVWVvSYvulEWmrqJHVnQqy7zNLGk3COaMOo42DYX9DgJ38EowQQNc89phSvwlxkZK%2BOBFkCrZdd0Vn9151ytC8MeadqBy2hut2rvA92izQ%2B3m%2FMD8a6gHUDPMXI60PXmvoyluo8gktOHTF34snHZEWUb8c9318hsSbEKs%3D; logged-in-user=sunranlb%40qq.com; ol-auth-url=%2F%2Farchive.org%2Fservices%2Fborrow%2FXXX%3Fmode%3Dauth; loan-anatomyoftitanic0000mccl=1671377799-1e9a219e66b18003101a0b9b081fc407",
        }
    })
        .on("response", (res) => {
            if (res.statusCode != 200) {
                throw new Error(res.statusCode + ':' + url);
            } else {
                console.log("done " + name);
                // if (i < 21) {
                //     start(g, i + 1, j);
                // } else if (j < 140) {
                //     start(g, 0, j + 1);
                // }
            }
        })
        .on("error", (err) => {
            console.error(url);
            console.error(err);
        })
        .pipe(fs.createWriteStream('img/' + name + '.jpg'));
    console.log('img/' + name + '.jpg');
}

start(0, 2, 3);