const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 3000;

app.use('/play', express.static(path.join(__dirname, 'play')));
app.use('/carts', express.static(path.join(__dirname, 'carts')));

app.get('/', (req, res) => {
    console.log(`Get index.html req:${req}`);
    var index_html = path.join(__dirname, 'index.html');
    res.sendFile(index_html);
    console.log(`Return file ${index_html}`);
});

app.get('/api/search_carts', function (req, res) {
    console.log(`Get Search for /carts req:${req}`);
    // 利用递归获取文件夹下的所有文件
    var readdir = function (p) {
        return new Promise((resolve, reject) => {
            fs.promises.stat(p)
                .then(stat => {
                    if (stat.isFile()) {
                        console.log(`File Path:${p}`);
                        resolve([p]);
                        return;
                    }
                    if (stat.isDirectory()) {
                        console.log(`Dir Path:${p}`);
                        return fs.promises.readdir(p);
                    }
                    return Promise.reject(new Error('Only support file or directory!'));
                })
                .then(files => {
                    var promises = [];
                    for (const file of files) {
                        if (file.startsWith('.')) {
                            continue;
                        }
                        promises.push(readdir(`${p}/${file}`));
                    }
                    return Promise.all(promises);
                })
                .then(filesArr => {
                    var result = [];
                    for (const arr of filesArr) {
                        result = result.concat(arr);
                    }
                    resolve(result);
                })
                .catch(err => {
                    reject(err);
                });
        });
    }
    readdir('./carts').then(files => {
        var response = {
            files: files
        };
        var json = JSON.stringify(response);
        res.end(json);
        console.log(`Return Searching Carts!`);
    }, err => {
        console.log(`Search for ./carts error! err:${err}`);
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});