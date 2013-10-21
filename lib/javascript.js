'use strict';

var fs = require('fs');
var util = require('util');
var crypto = require('crypto');
var uglify = require('uglify-js');

var utils = require('./utils');

var javascript = {
  smush: function (options, cb) {
    utils.files(options.template + options.extension, options.jade.js.pattern, function (err, data, files) {
      var flist, minified;
      if (err || !files.length) {
        return cb(new Error('No files to smush for ' + options.template + ' with pattern: ' + options.jade.js.pattern));
      }

      flist = files.map(function (file) {
        return options.jade.js.source + file + options.jade.js.extension;
      });

      try {
        minified = uglify.minify(flist);
      } catch (e) {
        return cb(e);
      }

      fs.mkdir(options.jade.js.target, function (err) {
        var outfilename = crypto.createHash('md5').update(minified.code).digest('hex') + options.jade.js.extension;
        fs.writeFileSync(options.jade.js.target + outfilename, minified.code, 'utf-8');
        if (data.match(options.replacePattern) === null) {
          util.log('placeholder missing from template ' + options.template);
          process.exit(1);
        } else {
          data = options.jade.comment + data;
          fs.writeFile(options.template + options.jade.extension, data.replace(options.jade.js.replacePattern, outfilename), function (err) {
            cb(err, outfilename);
          });
        }
      });
    });
  }
};

module.exports = javascript;
