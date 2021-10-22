const fs = require('fs');

const ARGS = process.argv.slice(2);
const path = ARGS[0] || './config.example.json';

if (!fs.existsSync(path)) {
  process.exit();
}

const configfile = fs.readFileSync(path);
const configObj = JSON.parse(configfile);

const literalsA = {
  dynamic: 'XYZ',
};
const literalsZ = {
  dynamic: 'LMZ',
};

const { parser } = require('../src/parsers/rules-parser');

const outputA = parser(configObj, literalsA);
console.log('OUTOUT:', outputA, 'SHOULD EQUAL `none fulfilled`');
const outputZ = parser(configObj, literalsZ);
console.log('OUTOUT:', outputZ, 'SHOULD EQUAL `starts m and ends z fulfilled`');
