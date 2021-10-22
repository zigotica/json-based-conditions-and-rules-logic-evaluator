const assert = require('assert');
const { isEqual } = require('./index');

describe('Conditions Method isEqual', () => {
  it('returns true when lhs is A and rhs is A', () => {
    assert.equal(isEqual('A', 'A'), true);
  });
  it('returns false when lhs is A and rhs is B', () => {
    assert.equal(isEqual('A', 'B'), false);
  });
  it('returns false when lhs is A and rhs is AA', () => {
    assert.equal(isEqual('A', 'AA'), false);
  });
});
