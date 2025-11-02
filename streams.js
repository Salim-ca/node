const fs = require('fs');

const readStream = fs.createReadStream('./blog1.txt', {encoding: 'utf8'});
// to write this chunk in other txt file
const writeStream = fs.createWriteStream('./blog2.txt');
readStream.on('data', (chunk) =>{
    console.log('-----NEW CHUNk-----');
    console.log(chunk);
    writeStream.write('\nNEW CHUNK\n');
    writeStream.write(chunk);
})