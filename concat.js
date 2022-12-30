import mergeImg from 'merge-img';

const MAX_ROW_NUM = 4;
const MAX_COL_NUM = 34;
let ci = [];
for (let i = 0; i <= MAX_ROW_NUM; i++) {
    let ri = [];
    let rn = './rows/' + i + '.jpg';

    // anno it
    // for (let j = 0; j <= MAX_COL_NUM; j++) {
    //     ri.push('./img/6-' + j + '-' + i + '.jpg');
    // }
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