/* eslint quotes: ["error", "single", { "allowTemplateLiterals": true }] */
const assert = require('assert');
const { parser } = require('./index');

const CONDITIONS = {
  contains_c: {
    lhs: 'dynamic',
    rhs: 'C',
    type: 'contains',
  },
  contains_m: {
    lhs: 'dynamic',
    rhs: 'M',
    type: 'contains',
  },
  starts_d: {
    lhs: 'dynamic',
    rhs: 'D',
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
};

const SIMPLE_RULE = [
  {
    conditions: [
      {
        id: 'contains_c',
        expected: true,
      },
    ],
    output: 'contains c fulfilled',
  },
];

const MIXED_RULE = [
  {
    conditions: [
      {
        id: 'contains_c',
        expected: true,
      },
    ],
    output: 'contains c fulfilled',
  },
  {
    operator: 'or',
    conditions: [
      {
        id: 'starts_d',
        expected: true,
      },
      {
        id: 'starts_a_b',
        expected: true,
      },
    ],
    output: 'starts d or a or b fulfilled',
  },
];

const COMPLEX_RULE = [
  {
    conditions: [
      {
        id: 'contains_c',
        expected: true,
      },
    ],
    output: 'contains c fulfilled',
  },
  {
    operator: 'or',
    conditions: [
      {
        id: 'starts_d',
        expected: true,
      },
      {
        id: 'starts_a_b',
        expected: true,
      },
    ],
    output: 'starts d or a or b fulfilled',
  },
  {
    operator: 'and',
    conditions: [
      {
        id: 'contains_m',
        expected: true,
      },
      {
        id: 'ends_z',
        expected: true,
      },
    ],
    output: 'starts m and ends z fulfilled',
  },
];

const EDGE_RULE = [
  {
    conditions: [
      {
        id: 'non_existing',
        expected: true,
      },
    ],
    output: 'non existing fulfilled',
  },
];

const DEFAULT = 'none fulfilled';

describe('Rules Parser', () => {
  describe('Simple scenario, one rule without operator (one condition per rule)', () => {
    it(`returns '${SIMPLE_RULE[0].output}' when rule fulfills`, () => {
      const literals = {
        dynamic: 'C',
      };
      const expected = SIMPLE_RULE[0].output;
      assert.equal(parser({ CONDITIONS, RULES: SIMPLE_RULE, DEFAULT }, literals), expected);
    });
    it(`returns default '${DEFAULT}' output when rule does not fulfill`, () => {
      const literals = {
        dynamic: 'X',
      };
      assert.equal(parser({ CONDITIONS, RULES: SIMPLE_RULE, DEFAULT }, literals), DEFAULT);
    });
  });

  describe('Mixed scenario, one rule without operator and one rule with `or` operator', () => {
    it(`returns '${MIXED_RULE[1].output}' when second rule with 'or' fulfills`, () => {
      const literals = {
        dynamic: 'B',
      };
      const expected = MIXED_RULE[1].output;
      assert.equal(parser({ CONDITIONS, RULES: MIXED_RULE, DEFAULT }, literals), expected);
    });
    it(`returns default '${DEFAULT}' output when none of the rules fulfill`, () => {
      const literals = {
        dynamic: 'X',
      };
      assert.equal(parser({ CONDITIONS, RULES: SIMPLE_RULE, DEFAULT }, literals), DEFAULT);
    });
  });

  describe('Complex scenario, one rule without operator, one with `or`, one with `and` operator', () => {
    it(`returns '${COMPLEX_RULE[2].output}' when third rule with 'and' fulfills`, () => {
      const literals = {
        dynamic: 'LMZ',
      };
      const expected = COMPLEX_RULE[2].output;
      assert.equal(parser({ CONDITIONS, RULES: COMPLEX_RULE, DEFAULT }, literals), expected);
    });
    it(`returns default '${DEFAULT}' output when none of the rules fulfill`, () => {
      const literals = {
        dynamic: 'X',
      };
      assert.equal(parser({ CONDITIONS, RULES: COMPLEX_RULE, DEFAULT }, literals), DEFAULT);
    });
  });

  describe('Edge case scenario, one rule with reference to unexisting condition', () => {
    it(`returns default '${DEFAULT}' output when rule does not fulfill`, () => {
      const literals = {
        dynamic: 'X',
      };
      assert.equal(parser({ CONDITIONS, RULES: EDGE_RULE, DEFAULT }, literals), DEFAULT);
    });
  });
});
