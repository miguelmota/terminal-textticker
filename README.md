# textticker

> A scrolling text ticker in terminal

# Demo

<img src="https://raw.githubusercontent.com/miguelmota/terminal-textticker/master/screenshot.gif" />

## Install

```bash
npm install terminal-textticker
```

## Usage

```javascript
var textTicker = require('terminal-textticker');

var sayings = [
  'Programs must be written for people to read, and only incidentally for machines to execute.',
  "Dream as if you'll live forever, live as if you'll die today.",
  'Change breaks the brittle.'
];

var index = 0;

textTicker({
  text: sayings[0],
  duration: 50,
}, function(text) {
  setTimeout(function() {
    var nextSaying = index <= 1 ? (index += 1, sayings[index]) : (index = 0, sayings[index]);
    textTicker.setText(nextSaying);
    textTicker.reload();
  }, 4e3);
});

```

# Resources

The browser version of is also available, [textticker](https://github.com/miguelmota/textticker).

# License

MIT
