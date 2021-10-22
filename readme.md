# JSON based conditions and rules logic evaluator

## What

A script that parses some customizable conditions and rules, then outputs a predefined value of that matching rule, or a default value.

## Why

My [z12 micropad](https://github.com/zigotica/mechanical-keyboards/tree/main/z12) uses 4 layers: vim, browser, figma and default. Encoders do different things on each layer. More often than not, when working in Figma I wanted to zoom using the right encoder, but if I had the default layer active, the encoder would scroll instead. I created a [node script (active-app-qmk-layer-updater)](https://github.com/zigotica/active-app-qmk-layer-updater) that checks the active app every half a second, and uses this script as a dependency to match the app name and title to a set of conditions and rules. This way I can get an output (in my case, a layer index) to change the kaymap layer in the QMK keyboard.

## Setup

To determine which output to return, we need to match a set of conditions and rules, which are completely configurable using a simple JSON file, against a literals object.

### Literals

Literals hold values to be compared against, by reference. These are not part of the main JSON file, because they are the dymamic values that the main script will be using to match against the conditions and rules. This object will be sent to the parser as a second argument.

Be sure to `.trim().toLowerCase()` each value while building the literal object if you want to remove spaces from both ends of the string and make it case insensitive.

### Conditions

CONDITONS is an object that includes one object per condition to be parsed by the rules.

Each condition has an id, and requires two values and an operator that will calculate if the condition is fulfilled.

The left hand side value is a reference to literals explained above.

The right hand value is the string we want to compare against. It can also be an array of strings. In that case, for the condition to be fulfilled, at least one of the strings in the array need to satisfy the operation.

The operator is any of the conditions defined in the conditions folder: `contains`, `ends`,  `equals` or `starts`.

A condition returns a boolean, being true when it fulfills.

### Rules

RULES is an array that includes one object per set of conditions.

Each set of conditions can have one or several conditions. In case of having more than one condition, the operator will define their logic. `or` operator will define that at least one of the conditions needs to be met in order to satisfy the rule. `and` operator  will define that all the conditions must be met in order to satisfy the rule.

Rules are evaluated top down.

The first rule that fulfills will break the loop and return the output value.

### Default value

If no rule is satisfied, default value will be returned.

## How to run it

Import the parser in the script running this dependency:

```
const { parser } = require('json-based-conditions-and-rules-logic-evaluator');
```

Then load the config JSON file (or create a static JSON file):

```
const configfile = fs.readFileSync(path);
const configObject = JSON.parse(configfile);
```

Create a literals object that will include the key/value pairs to be used as references in the conditions lhs (left hand side):

```
const literals = {
  'app': 'Terminal',
  'title': 'VIM',
};
```

In my case, that literals object is updated every half a second. It's up to your app's purpose to update this.

Then call the parser, passing the config and literals objects as arguments:

```
const output = parser(configObject, literals);
```

This script will evaluate the output according to the predefined conditons and rules. Your app can then consume the output and do whatever action with it.

## To Do

* [x] Documentation
  * [x] Basic use
  * [x] Configuration file
* [x] Examples
* [x] Tests

## Users

- [active-app-qmk-layer-updater](https://github.com/zigotica/active-app-qmk-layer-updater) - Sends the active app info to a QMK device to change keymap layers automatically.

