'use strict';

var util = require('util');
var smushcss = require('./lib/css');
var smushjs = require('./lib/javascript');

var defaults = {
  extension: '.tmpl',
  jade: {
    extension: '.jade',
    comment: '//- This is a generated file. Make your changes to the .tmpl file instead.\n\n',
    css: {
      pattern: /link\(rel=\"stylesheet\", href=\"(.*)\.css\"/,
      replacePattern: '<PLACEHOLDERFORMINIFIEDFILE>',
      extension: '.css',
      source: 'public',
      target: 'public/css/min/'
    },
    js: {
      pattern: /script\(src\=\"(.*)\.js\"/,
      replacePattern: '<PLACEHOLDERFORMINIFIEDFILE>',
      extension: '.js',
      source: 'public',
      target: 'public/js/min/'
    }
  }
};

var smush = {
  css: function (options, cb) {
    if (!options.template) {
      return cb(new Error('no template set'));
    }
    var smushOptions = {
      template: options.template,
      extension: options.extension || defaults.extension,
      jade: {
        extension: options.jadeExtension || defaults.jade.extension,
        comment: options.comment || defaults.jade.comment,
        css: {
          pattern: options.pattern || defaults.jade.css.pattern,
          replacePattern: options.replacePattern || defaults.jade.css.replacePattern,
          extension: options.cssExtension || defaults.jade.css.extension,
          source: options.source || defaults.jade.css.source,
          target: options.target || defaults.jade.css.target
        }
      }
    };
    smushcss.smush(smushOptions, cb);
  },
  js: function (options, cb) {
    if (!options.template) {
      return cb(new Error('no template set'));
    }
    var smushOptions = {
      template: options.template,
      extension: options.extension || defaults.extension,
      jade: {
        extension: options.jadeExtension || defaults.jade.extension,
        comment: options.comment || defaults.jade.comment,
        js: {
          pattern: options.pattern || defaults.jade.js.pattern,
          replacePattern: options.replacePattern || defaults.jade.js.replacePattern,
          extension: options.jsExtension || defaults.jade.js.extension,
          source: options.source || defaults.jade.js.source,
          target: options.target || defaults.jade.js.target
        }
      }
    };
    smushjs.smush(smushOptions, cb);
  }
};

function errHandler(e) {
  util.log('Minfication failed, aborting deployment');
  util.log(e.stack);
  process.exit(1);
}

process.on('uncaughtException', errHandler);

module.exports = smush;

if (require.main === module) {
  (function () {
    var test = require('./test');
    test.init(function (err, res) {
      console.log(err || res);
    });
  })();
}
