MinifyJS
========

Utility package to help minify css and js files. Currently supports `jade` template language, but can easily be extended to support other formats.

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


### Minify CSS

Use `minifyjs.css(options, callback)` to minify css files. `template` is a required field that species the `.tmpl` file to minify.

**Example**

    var minifyjs = require('minifyjs');
    minifyjs.css({
      template: 'test/sample/css/styles',
      pattern: /link\(rel=\"stylesheet\",href=\"(.*)\.css\"/,
      source: 'test/sample/',
      target: 'test/sample/min/'
    }, callback);


### Minify JS

Use `minifyjs.js(options, callback)` to minify javascript files. `template` is a required field that species the `.tmpl` file to minify.

**Example**

    minifyjs.js({
      template: 'test/sample/js/scripts',
      pattern: /script\(src\=\'(.*)\.js\'/,
      source: 'test/sample/',
      target: 'test/sample/min/'
    }, callback);


### Test Code

Run `npm test` or `node path/to/minifyjs/index.js` to verify if minification is working. Please check files under `test` dir for a sample implementaion.
