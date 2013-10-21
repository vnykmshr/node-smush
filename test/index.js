'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');

var smushjs = require('../');

var smush = {
  init: function (cb) {
    util.log('Starting css smush test');
    smush.testcss(function (err, css) {
      if (err) return cb(err);
      util.log('Starting js smush test');
      smush.testjs(function (err, js) {
        if (err) return cb(err);
        util.log('Starting cleanup');
        var files = [path.join('test/sample/min', css), path.join('test/sample/min', js)];
        smush.cleanup(files, cb);
      });
    });
  },

  testjs: function (cb) {
    smushjs.js({
      template: 'test/sample/js/scripts',
      pattern: /script\(src\=\'(.*)\.js\'/,
      source: 'test/sample/',
      target: 'test/sample/min/'
    }, cb);
  },

  testcss: function (cb, next) {
    smushjs.css({
      template: 'test/sample/css/styles',
      pattern: /link\(rel=\"stylesheet\",href=\"(.*)\.css\"/,
      source: 'test/sample/',
      target: 'test/sample/min/'
    }, cb);
  },

  cleanup: function (files, cb) {
    var i = 0;
    for (i; i < files.length; i++) {
      var file = files[i];
      if (fs.existsSync(file)) {
        util.log('Cleaning up: ' + file);
        fs.unlinkSync(file);
      }
    }
    cb(null, files);
  }
};

module.exports = smush;

if (require.main === module) {
  (function () {
    var logcb = function (err, res) {
      util.log(err || res);
      util.log('test complete');
    };
    smush.init(logcb);
  })();
}
