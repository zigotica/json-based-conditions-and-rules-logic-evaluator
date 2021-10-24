// conditions
const { isContained } = require('./conditions/contains');
const { isEndedWith } = require('./conditions/ends-with');
const { isEqual } = require('./conditions/equals');
const { isStartedWith } = require('./conditions/starts-with');

exports.isContained = isContained;
exports.isEndedWith = isEndedWith;
exports.isEqual = isEqual;
exports.isStartedWith = isStartedWith;

// parsers
const { conditionsParser } = require('./parsers/conditions-parser');
const { parser } = require('./parsers/rules-parser');

exports.conditionsParser = conditionsParser;
exports.parser = parser;
