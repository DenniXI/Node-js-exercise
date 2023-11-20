const crypto = require('crypto');
Object.keys(crypto);
const randomBytes = crypto.randomBytes(8);
const randomID = randomBytes.toString('hex');
console.log(randomID);