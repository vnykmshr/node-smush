'use strict';

var fs = require('fs');
var crypto = require('crypto');
var CleanCSS = require('clean-css');

var utils = require('./utils');

var css = {
  smush: function (options, cb) {
    utils.files(options.template + options.extension,
      options.jade.css.pattern, fetchedFiles);

    function fetchedFiles(err, data, files) {
      var allCSS = '';

      if (err || !files.length) {
        return cb(err || new Error('No files to smush for ' + options.template));
      }

      files.forEach(function (file) {
        file = options.jade.css.source + file + options.jade.css.extension;
        allCSS += fs.readFileSync(file).toString();
      });

      fs.mkdir(options.jade.css.target, saveMinified);

      function saveMinified() {
        var outfilename = crypto.createHash('md5')
          .update(allCSS).digest('hex') + options.jade.css.extension;

        fs.writeFileSync(options.jade.css.target + outfilename,
          new CleanCSS().minify(allCSS).styles, 'utf-8');

        data = options.jade.comment + data;

        fs.writeFile(options.template + options.jade.extension,
          data.replace(options.jade.css.replacePattern, outfilename), respond);

        function respond(err) {
          cb(err, outfilename);
        }
      }
    }
  }
};

module.exports = css;
