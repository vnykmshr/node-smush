'use strict';

var fs = require('fs');
var util = require('util');
var crypto = require('crypto');
var cleancss = new require('clean-css')();
var utils = require('./utils');

var css = {
  smush: function (options, cb) {
    utils.files(options.template + options.extension, options.jade.css.pattern, function (err, data, files) {
      var allCSS = '';
      if (err || files.length === 0) {
        return cb(err || new Error('No files to smush for ' + options.template));
      }

      files.forEach(function (file, i) {
        file = options.jade.css.source + file + options.jade.css.extension;
        allCSS += fs.readFileSync(file).toString();
      });

      fs.mkdir(options.jade.css.target, function (err) {
        var outfilename = crypto.createHash('md5').update(allCSS).digest('hex') + options.jade.css.extension;
        fs.writeFileSync(options.jade.css.target + outfilename, cleancss.minify(allCSS), 'utf-8');
        data = options.jade.comment + data;
        fs.writeFile(options.template + options.jade.extension, data.replace(options.jade.css.replacePattern, outfilename), function (err) {
          cb(err, outfilename);
        });
      });
    });
  }
};

module.exports = css;
