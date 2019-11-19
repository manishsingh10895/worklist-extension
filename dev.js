const fs = require('fs');

const configFilePath = __dirname + '/src/config.ts';


fs.open(configFilePath, 'w+', (err, fd) => {

    if (err) {
        console.log(err);
        return;
    }

    let str = `export const ENVIRONMENT: 'production' | 'development' = 'development';`;

    fs.write(fd, str, (err, w, s) => {
        if (err) {
            console.error(err);
            return
        }

        console.log(w);
        console.log(s);
    })
});


