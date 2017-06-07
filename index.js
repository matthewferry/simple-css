const fs = require('fs');
const postcss = require('postcss');
const atImport = require('postcss-import');
const autoprefix = require('autoprefixer');
const customProperties = require('postcss-custom-properties');
const customMedia = require('postcss-custom-media');
const calc = require('postcss-calc');
const cssnano = require('cssnano');
const stylelint = require('stylelint');
const reporter = require('postcss-reporter');

const css = fs.readFileSync('index.css', 'utf8');

postcss([
  atImport({
    plugins: [
      stylelint({
        configFile: './.stylelintrc',
      }),
    ],
  }),
  autoprefix(),
  customProperties(),
  customMedia(),
  calc(),
  cssnano({
    discardComments: {
      removeAll: true,
    },
  }),
  reporter(),
])
.process(css, {
  from: 'index.css',
  to: 'dist/index.css',
})
.then((result) => {
  fs.writeFile('dist/index.css', result.css);
});
