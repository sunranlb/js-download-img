import mergeImg from 'merge-img';

let ci = [];
for (let i = 0; i <= 4; i++) {
    let ri = [];

    // anno it
    // for (let j = 0; j <= 21; j++) {
    //     ri.push('./img/5-' + j + '-' + i + '.jpg');
    // }
    // anno it
    let rn = './rows/' + i + '.jpg';
    // anno it
    // mergeImg(ri)
    // .then((img) => {
    //     // Save image as file
    //     img.write(rn, () => console.log('done! ' + rn));
    // });
    // anno it
    ci.push(rn);
}

// anno it
mergeImg(ci, {
        direction: true
    })
            .then((img) => {
                    // Save image as file
                    img.write('out.jpg', () => console.log('ALL DONE!'));
                });
// anno it