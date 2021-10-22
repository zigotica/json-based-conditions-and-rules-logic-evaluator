const assert = require('assert');
const { isStartedWith } = require('./index');

describe('Conditions Method isStartedWith', () => {
  it('returns true when lhs is ABCD and rhs is A', () => {
    assert.equal(isStartedWith('ABCD', 'A'), true);
  });
  it('returns true when lhs is ABCD and rhs is ABCD', () => {
    assert.equal(isStartedWith('ABCD', 'ABCD'), true);
  });
  it('returns false when lhs is ABCD and rhs is C', () => {
    assert.equal(isStartedWith('ABCD', 'C'), false);
  });
});
