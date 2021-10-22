const assert = require('assert');
const { isEndedWith } = require('./index');

describe('Conditions Method isEndedWith', () => {
  it('returns true when lhs is ABCD and rhs is D', () => {
    assert.equal(isEndedWith('ABCD', 'D'), true);
  });
  it('returns true when lhs is ABCD and rhs is ABCD', () => {
    assert.equal(isEndedWith('ABCD', 'ABCD'), true);
  });
  it('returns false when lhs is ABCD and rhs is C', () => {
    assert.equal(isEndedWith('ABCD', 'C'), false);
  });
});
