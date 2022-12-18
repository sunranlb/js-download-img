var request = require('request');
var fs = require('fs');
var util = require('util');

// just change this line, from .html file bottom
// let img_data = "JYWw5g9ATAzAHDAnBJAWA7O1EAMMD6OOAjAHQBWADmADSiSwLJqbZ6E5QXV3jTxIUiDFlwEiMbrXr8mQkW3E5UU3gwHNhrMRwCsqmY0EtR7IgDYDfI5oU6i6K+rknFHOE9nGtppYk828tpmxDgBGkG+hMRkVNLWEa72xFxxal62weLEkmmGiT5uJCp5CS6Fyfqlzt52IZbVGZFFxI6NgUkhHu0Fddn+PeV9hFBhg7VZI7E8+UOTnKkzZRNRnLlLNZmrUCUbTZ3iUFV7HRVmUA0nvfNQbVdz2933K0VQA89bRTBjH832MNN4ps/mYYIsgfszuIYOsIadhnhdnDrqsYMdkQ8vpcMS9/nccZ9/k8CSDoe8SQdCKgfhSoVTAel4fNUODGSiiqhYWzMfZUEjubizKh0QLCULsaLSVT8ZLKcpibK6cpyYqEboaar5roGbNBeJdKzdWL9VyjVKcLp+Wa5boRdalboJfa1TLnVqFW7VroVZ6iuYNb77OYdctjYRzIbQ+bzKao3LzFa40rzHakwjzE60/NzK6s6tzB6836fUX7OgA6WzOgQ8C5ehI7WlehY42EVhwjyq6nW/N0Jme6tMB29YR0IWB0V0CWJ/Y4BWZ2Y4DXIQi4A2V/MEMOwzg4ImF+I4N2N6s4P2T0U4LmD4Q4OOL7Ppw+zIh58/xIhl0zVoh19+iogLbvoQwjbuaiDHv+9iIOeUEvtewE4Ig95wR+T6ofgoRvhhoRfuyOihH++HsKEQE4coYGUqEkHEQQoSwbRmE4Ah5EoYxoToexoSUXSMR4Z2dEpDxwwxGRXH7sBMQ0QJmHEAxMkxCxXFsQpxCcQpozCZMKT8SOKRERpYkaRJOFHFpUQpPJem3OZbgpCp1nqXp3y2QRAKuSRYIeXRMLeZhMAmexaJ+TkVlhjkSkKfAIVICF1Jxbp4UsnFRl6XycXSWlYVSsQGBxQ5SVOeF6ohdqpUGXpuipcVgUKbapXZVRuiRZVBU5d6IX+p1iU5RGnXVb1tV6SmnWNbxOadW1VHmEVOXliF1YLRV4XNgtQ0rZlK1jSJQ7jCtU28VOIVzsdPVUWux0Ded605Uex3bdpV7HQdIlwLNVGviFn5fctOWAV9N0fZtf0PRZiAteFyFfe9dKjNhjGjGdsOcH5oxXcjgPI8DlKjKDbijPiQA"
// let originArr = LZString.decompressFromBase64(img_data).split(',');

// let url = 

let proxy_ip = '127.0.0.1';
let proxy_port = '7890';
let proxy = util.format('http://%s:%d', proxy_ip, proxy_port);

let si = 164; // start i
let sum = 70;   // num
function start(i) {
    if (i < si + sum) {
        let url = 'https://ia904501.us.archive.org/BookReader/BookReaderImages.php?zip=/4/items/anatomyoftitanic0000mccl/anatomyoftitanic0000mccl_jp2.zip&file=anatomyoftitanic0000mccl_jp2/anatomyoftitanic0000mccl_0'
        + i + '.jp2&id=anatomyoftitanic0000mccl&scale=1&rotate=0';
        request({
            url,
            proxy,
            headers: {
                "accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
                "accept-encoding": "gzip, deflate, br",
                "accept-language": "en-US,en;q=0.9,zh-CN;q=0.8,zh;q=0.7",
                "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
                "referer": "https://archive.org/details/anatomyoftitanic0000mccl/page/63/mode/1up",
                "cookie": "donation-identifier=65da4f8da4c14fbc5a7cc3f06e36ced1; abtest-identifier=84ac2b71bb718c9e5b584529ae220c2b; donation=x; test-cookie=1; br-loan-anatomyoftitanic0000mccl=1; PHPSESSID=flaq0p46458f35c36ja8lq3o26; logged-in-sig=1702829491%201671293491%20aA26DcFVWVvSYvulEWmrqJHVnQqy7zNLGk3COaMOo42DYX9DgJ38EowQQNc89phSvwlxkZK%2BOBFkCrZdd0Vn9151ytC8MeadqBy2hut2rvA92izQ%2B3m%2FMD8a6gHUDPMXI60PXmvoyluo8gktOHTF34snHZEWUb8c9318hsSbEKs%3D; logged-in-user=sunranlb%40qq.com; ol-auth-url=%2F%2Farchive.org%2Fservices%2Fborrow%2FXXX%3Fmode%3Dauth; loan-anatomyoftitanic0000mccl=1671377799-1e9a219e66b18003101a0b9b081fc407",
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

start(si);