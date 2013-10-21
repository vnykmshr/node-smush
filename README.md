SmushJS
========

### Install

```
$ npm install smush
```

[![Build Status](https://travis-ci.org/vnykmshr/node-smush.png?branch=master)](https://travis-ci.org/vnykmshr/node-smush)

Utility package to help smush css and js files. Currently supports `jade` template language, but can easily be extended to support other formats.

Minified files are placed in `options.target` dir, defaults to `public/css/min` and `public/js/min` for css and js files respectively.

The generated `.jade` files are placed alongside the `.tmpl` files.

### Default CSS & JS options

Please check default options for search and replace patterns listed below or in the `index.js` file. You just need to update the options to suit your needs.

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


### Smush CSS

Use `smushjs.css(options, callback)` to smush css files. `template` is a required field that species the `.tmpl` file to smush.

**Example**

    var smushjs = require('smushjs');
    smushjs.css({
      template: 'test/sample/css/styles',
      pattern: /link\(rel=\"stylesheet\",href=\"(.*)\.css\"/,
      source: 'test/sample/',
      target: 'test/sample/min/'
    }, callback);


### Smush JS

Use `smushjs.js(options, callback)` to smush javascript files. `template` is a required field that species the `.tmpl` file to smush.

**Example**

    smushjs.js({
      template: 'test/sample/js/scripts',
      pattern: /script\(src\=\'(.*)\.js\'/,
      source: 'test/sample/',
      target: 'test/sample/min/'
    }, callback);


### Test Code

Run `npm test` or `node path/to/smush/index.js` to verify if minification is working. Please check files under `test` dir for a sample implementaion.
