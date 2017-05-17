const fs = require('fs');
const postcss = require('postcss');
const atImport = require('postcss-import');
const autoprefix = require('autoprefixer');
const customProperties = require('postcss-custom-properties');
const customMedia = require("postcss-custom-media");
const calc = require('postcss-calc');
const stylelint = require('stylelint');
const commentAnnotation = require('postcss-comment-annotation');
const cssnano = require('cssnano');

const css = fs.readFileSync('index.css', 'utf8');

postcss([
    atImport(),
    autoprefix(),
    customProperties(),
    customMedia(),
    calc(),
    stylelint(),
    commentAnnotation(),
    cssnano({
      discardComments: {
        removeAll: true
      }
    }),
  ])
  .process(css, {
    from: 'index.css',
    to: 'dist/index.css',
  })
  .then(result => {
    fs.writeFile('dist/index.css', result.css);
  });
