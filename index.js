// @credit: single line log https://github.com/freeall/single-line-log

var MOVE_LEFT = new Buffer('1b5b3130303044', 'hex').toString();
var MOVE_UP = new Buffer('1b5b3141', 'hex').toString();
var CLEAR_LINE = new Buffer('1b5b304b', 'hex').toString();

module.exports = (function() {
  var stream = process.stdout;
  var write = stream.write;
  var str;
  var text = '';
  var tick;
  var prevLineCount = 0;

  stream.write = function(data) {
    if (str && data !== str) {
      str = null;
    }
    write.apply(this, arguments);
  };

  process.on('exit', function() {
    if (str !== null) {
      stream.write('');
    }
  });

  var log = function(text) {
    var nextStr = text || '';

    // Clear screen
    for (var i = 0; i < prevLineCount; i++) {
      str += MOVE_LEFT + CLEAR_LINE + (i < prevLineCount-1 ? MOVE_UP : '');
    }

    if (typeof str === 'undefined') str = '';

    str += nextStr;
    stream.write(str);

    // How many lines to remove on next clear screen
    prevLineCount = nextStr.split('\n').length;
  };

  log.clear = function() {
    stream.write('');
  };

  var textTicker = function(opts, cb) {
    opts = opts || {};
    text = opts.text;
    cb = cb || function(){};
    var duration = opts.duration || 50;

    tick = function() {
      textLength = text.length;
      leadCharOpacity = 1;
      var totalDuration = 0;

      for (var i = 0; i < textLength; i++) {
        totalDuration += duration;
        (function(i, t) {
          setTimeout(function() {
            log.clear();
            var outputStr = text.substr(0,i+1);
            log(outputStr);
            if (i === textLength - 1) {
              cb(outputStr);
            }
          }, t);
        })(i, totalDuration);
      }
    };

    tick();
  };

  textTicker.setText = function(txt) {
    text = txt;
  };

  textTicker.reload = function() {
    tick();
  };

  return textTicker;
})();
