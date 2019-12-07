const fs = require('fs');
const { promisify } = require('util');

const promisifiedFS = {};

promisifiedFS.readFile = promisify(fs.readFile);

module.exports = promisifiedFS;