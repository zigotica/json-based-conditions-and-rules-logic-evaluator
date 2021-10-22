/* eslint-disable no-plusplus */
const { conditionsParser } = require('../conditions-parser');

const parser = (config, literals) => {
  const { CONDITIONS, RULES, DEFAULT } = config;

  let OUTPUT = DEFAULT;
  for (let i = 0, l = RULES.length; i < l; i++) {
    const rule = RULES[i];
    const { operator, conditions, output } = rule;
    let qualifies = (operator === 'and') ? 1 : 0;

    conditions.forEach((condition) => {
      const { id, expected } = condition;
      let fulfilled;
      if (CONDITIONS[id]) { // make sure id exists
        fulfilled = conditionsParser(CONDITIONS[id], literals);
        if (operator === 'and') qualifies *= fulfilled;
        if (operator === 'or') qualifies += fulfilled;
        if (!operator) qualifies = fulfilled === expected;
      } else {
        fulfilled = false;
      }
    });

    if (qualifies) {
      OUTPUT = output;
      break;
    }
  }

  return OUTPUT;
};

exports.parser = parser;
