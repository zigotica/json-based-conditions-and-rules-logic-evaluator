/* eslint-disable no-plusplus */
const { isContained } = require('../../conditions/contains');
const { isEndedWith } = require('../../conditions/ends-with');
const { isEqual } = require('../../conditions/equals');
const { isStartedWith } = require('../../conditions/starts-with');

const conditionsParser = (condition, literals) => {
  const { type } = condition;
  let { lhs, rhs } = condition;
  let fulfilled = false;
  lhs = (typeof lhs === 'number') ? lhs : literals[lhs];

  if (typeof rhs !== 'object') rhs = [rhs];
  for (let i = 0, l = rhs.length; i < l; i++) {
    const rhsi = rhs[i];
    if (type === 'contains') {
      fulfilled = isContained(lhs, rhsi);
    } else if (type === 'ends') {
      fulfilled = isEndedWith(lhs, rhsi);
    } else if (type === 'starts') {
      fulfilled = isStartedWith(lhs, rhsi);
    } else if (type === 'equals') {
      fulfilled = isEqual(lhs, rhsi);
    }

    if (fulfilled === true) {
      break;
    }
  }

  return fulfilled;
};

exports.conditionsParser = conditionsParser;
