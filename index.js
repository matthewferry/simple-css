const fs = require('fs');
const postcss = require('postcss');
const atImport = require('postcss-import');
const autoprefix = require('autoprefixer');
const customProperties = require('postcss-custom-properties');
const calc = require('postcss-calc');
const stylelint = require('stylelint');
//const commentAn = require('./plugins/postcss-comment-annotations');
const cssnano = require('cssnano');

const css = fs.readFileSync('index.css', 'utf8');

postcss([
    atImport(),
    autoprefix(),
    customProperties(),
    calc(),
    stylelint(),
    //commentAn(),
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
    fs.writeFileSync('dist/index.css', result.css);
  });
