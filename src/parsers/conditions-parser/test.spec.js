/* eslint quotes: ["error", "single", { "allowTemplateLiterals": true }] */
const assert = require('assert');
const { conditionsParser } = require('./index');

const CONDITIONS = {
  contains_c: {
    lhs: 'dynamic',
    rhs: 'C',
    type: 'contains',
  },
  contains_w_r_c: {
    lhs: 'dynamic',
    rhs: ['W', 'R', 'C'],
    type: 'contains',
  },
  equals_a: {
    lhs: 'dynamic',
    rhs: 'A',
    type: 'equals',
  },
  equals_b_a: {
    lhs: 'dynamic',
    rhs: ['B', 'A'],
    type: 'equals',
  },
  starts_a: {
    lhs: 'dynamic',
    rhs: 'A',
    type: 'starts',
  },
  starts_a_b: {
    lhs: 'dynamic',
    rhs: ['A', 'B'],
    type: 'starts',
  },
  ends_z: {
    lhs: 'dynamic',
    rhs: 'Z',
    type: 'ends',
  },
  ends_y_z: {
    lhs: 'dynamic',
    rhs: ['Y', 'Z'],
    type: 'ends',
  },
};

describe('Conditions Parser', () => {
  describe('type contains', () => {
    it('returns true when rhs C value is contained in the lhs ABCD literal', () => {
      const literals = {
        dynamic: 'ABCD',
      };
      assert.equal(conditionsParser(CONDITIONS.contains_c, literals), true);
    });
    it('returns false when rhs C value is not contained in the lhs EFGH literal', () => {
      const literals = {
        dynamic: 'EFGH',
      };
      assert.equal(conditionsParser(CONDITIONS.contains_c, literals), false);
    });
    it(`returns true when any of the values in rhs array [${CONDITIONS.contains_w_r_c.rhs}] is contained in the lhs ABCD literal`, () => {
      const literals = {
        dynamic: 'ABCD',
      };
      assert.equal(conditionsParser(CONDITIONS.contains_w_r_c, literals), true);
    });
    it(`returns false when none of the values in rhs array [${CONDITIONS.contains_w_r_c.rhs}] is contained in the lhs 'J' literal`, () => {
      const literals = {
        dynamic: 'J',
      };
      assert.equal(conditionsParser(CONDITIONS.contains_w_r_c, literals), false);
    });
  });

  describe('type equals', () => {
    it('returns true when rhs `A` value equals the lhs `A` literal', () => {
      const literals = {
        dynamic: 'A',
      };
      assert.equal(conditionsParser(CONDITIONS.equals_a, literals), true);
    });
    it('returns false when rhs `A` value does not equal the lhs `Z` literal', () => {
      const literals = {
        dynamic: 'Z',
      };
      assert.equal(conditionsParser(CONDITIONS.equals_a, literals), false);
    });
    it(`returns true when any of the values in rhs array [${CONDITIONS.equals_b_a.rhs}] equals the lhs 'A' literal`, () => {
      const literals = {
        dynamic: 'A',
      };
      assert.equal(conditionsParser(CONDITIONS.equals_b_a, literals), true);
    });
    it(`returns false when none of the values in rhs array [${CONDITIONS.equals_b_a.rhs}] equals the lhs 'Z' literal`, () => {
      const literals = {
        dynamic: 'Z',
      };
      assert.equal(conditionsParser(CONDITIONS.equals_b_a, literals), false);
    });
  });

  describe('type starts', () => {
    it(`returns true when rhs 'A' value is the start of the lhs 'ABCD' literal`, () => {
      const literals = {
        dynamic: 'ABCD',
      };
      assert.equal(conditionsParser(CONDITIONS.starts_a, literals), true);
    });
    it(`returns false when rhs 'A' value is not the start of the lhs 'CBAD' literal`, () => {
      const literals = {
        dynamic: 'CBAD',
      };
      assert.equal(conditionsParser(CONDITIONS.starts_a, literals), false);
    });
    it(`returns true when any of the values in rhs array [${CONDITIONS.starts_a_b.rhs}] is the start of the lhs 'ABCD' literal`, () => {
      const literals = {
        dynamic: 'ABCD',
      };
      assert.equal(conditionsParser(CONDITIONS.starts_a_b, literals), true);
    });
    it(`returns false when none of the values in rhs array [${CONDITIONS.starts_a_b.rhs}] is the start of the lhs 'CBAD' literal`, () => {
      const literals = {
        dynamic: 'CBAD',
      };
      assert.equal(conditionsParser(CONDITIONS.starts_a_b, literals), false);
    });
  });

  describe('type ends', () => {
    it(`returns true when rhs 'Z' value is the end of the lhs 'XYZ' literal`, () => {
      const literals = {
        dynamic: 'XYZ',
      };
      assert.equal(conditionsParser(CONDITIONS.ends_z, literals), true);
    });
    it(`returns false when rhs 'Z' value is not the end of the lhs 'ZYX' literal`, () => {
      const literals = {
        dynamic: 'ZYX',
      };
      assert.equal(conditionsParser(CONDITIONS.ends_z, literals), false);
    });
    it(`returns true when any of the values in rhs array [${CONDITIONS.ends_y_z.rhs}] is the end of the lhs 'XYZ' literal`, () => {
      const literals = {
        dynamic: 'XYZ',
      };
      assert.equal(conditionsParser(CONDITIONS.ends_y_z, literals), true);
    });
    it(`returns false when none of the values in rhs array [${CONDITIONS.ends_y_z.rhs}] is the end of the lhs 'ZYX' literal`, () => {
      const literals = {
        dynamic: 'ZYX',
      };
      assert.equal(conditionsParser(CONDITIONS.ends_y_z, literals), false);
    });
  });
});
