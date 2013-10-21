'use strict';

var fs = require('fs');

var utils = {
  files: function (template, pattern, cb) {
    fs.readFile(template, 'utf-8', function (err, data) {
      var files = [];
      var file;
      var match;
      var style = data;

      if (err) {
        return cb(err);
      }
      while ((match = data.match(pattern)) !== null) {
        file = match[1];
        data = data.substring(match.index + 1);
        if (utils.startsWith(file, '//') || utils.startsWith(file, 'http')) {
          // TODO: Ignore net based resources for now
          continue;
        }

        files.push(file);
      }
      cb(err, style, files);
    });
  },
  startsWith: function (input, str) {
    return input.slice(0, str.length) === str;
  }
};

module.exports = utils;
