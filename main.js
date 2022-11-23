var request = require('request');
var fs = require('fs');
const LZString = require("lz-string")

// just change this line, from .html file bottom
let img_data = "JYWw5g9ATAzAHDAnBJAWA7O1EAMMD6OOAjAHQBWADmADSiSwLJqbZ6E5QXV3jTxIUiDFlwEiMbrXr8mQkW3E5UU3gwHNhrMRwCsqmY0EtR7IgDYDfI5oU6i6K+rknFHOE9nGtppYk828tpmxDgBGkG+hMRkVNLWEa72xFxxal62weLEkmmGiT5uJCp5CS6Fyfqlzt52IZbVGZFFxI6NgUkhHu0Fddn+PeV9hFBhg7VZI7E8+UOTnKkzZRNRnLlLNZmrUCUbTZ3iUFV7HRVmUA0nvfNQbVdz2933K0VQA89bRTBjH832MNN4ps/mYYIsgfszuIYOsIadhnhdnDrqsYMdkQ8vpcMS9/nccZ9/k8CSDoe8SQdCKgfhSoVTAel4fNUODGSiiqhYWzMfZUEjubizKh0QLCULsaLSVT8ZLKcpibK6cpyYqEboaar5roGbNBeJdKzdWL9VyjVKcLp+Wa5boRdalboJfa1TLnVqFW7VroVZ6iuYNb77OYdctjYRzIbQ+bzKao3LzFa40rzHakwjzE60/NzK6s6tzB6836fUX7OgA6WzOgQ8C5ehI7WlehY42EVhwjyq6nW/N0Jme6tMB29YR0IWB0V0CWJ/Y4BWZ2Y4DXIQi4A2V/MEMOwzg4ImF+I4N2N6s4P2T0U4LmD4Q4OOL7Ppw+zIh58/xIhl0zVoh19+iogLbvoQwjbuaiDHv+9iIOeUEvtewE4Ig95wR+T6ofgoRvhhoRfuyOihH++HsKEQE4coYGUqEkHEQQoSwbRmE4Ah5EoYxoToexoSUXSMR4Z2dEpDxwwxGRXH7sBMQ0QJmHEAxMkxCxXFsQpxCcQpozCZMKT8SOKRERpYkaRJOFHFpUQpPJem3OZbgpCp1nqXp3y2QRAKuSRYIeXRMLeZhMAmexaJ+TkVlhjkSkKfAIVICF1Jxbp4UsnFRl6XycXSWlYVSsQGBxQ5SVOeF6ohdqpUGXpuipcVgUKbapXZVRuiRZVBU5d6IX+p1iU5RGnXVb1tV6SmnWNbxOadW1VHmEVOXliF1YLRV4XNgtQ0rZlK1jSJQ7jCtU28VOIVzsdPVUWux0Ded605Uex3bdpV7HQdIlwLNVGviFn5fctOWAV9N0fZtf0PRZiAteFyFfe9dKjNhjGjGdsOcH5oxXcjgPI8DlKjKDbijPiQA"
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
                console.log("done " + (i + 1) + "/" + originArr.length);
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