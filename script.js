const fs = require('node:fs');

fs.writeFile("file-1.txt", "Hello everyone!",(error, data) => {
    if (error){
        console.error(error)
        return;
    }
    console.log(data)
})