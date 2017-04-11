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
    const rootSize = 12;
    const bodySize = 16;
    const scaleSize = 16;
    const scaleRatio = 1.333333;
    const scaleIncrement = 1;
    const fontSize = scaleSize * Math.pow(scaleRatio, scaleIncrement);
    const lineHeight = 3;
    const capHeight = 0.72;
    const bottomSpace = 0;
    const baselineShift = fontSize / 2 * ((lineHeight * rootSize / fontSize) - capHeight) / rootSize + 0.00001;
    const rhythmReset = bottomSpace - baselineShift;
    const typeCss = `
      font-size: ${fontSize/rootSize}rem;
      line-height: ${lineHeight}rem;
      margin: 0 0 ${rhythmReset}rem;
      padding-top: ${baselineShift}rem;
      `;

    console.log(typeCss);

    fs.writeFileSync('dist/index.css', result.css);
  });
