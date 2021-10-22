const assert = require('assert');
const { isContained } = require('./index');

describe('Conditions Method isContained', () => {
  it('returns true when lhs is ABCD and rhs is B', () => {
    assert.equal(isContained('ABCD', 'B'), true);
  });
  it('returns true when lhs is ABCD and rhs is B', () => {
    assert.equal(isContained('ABCD', 'ABCD'), true);
  });
  it('returns false when lhs is ABCD and rhs is Z', () => {
    assert.equal(isContained('ABCD', 'Z'), false);
  });
});
