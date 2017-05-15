const fs = require('fs');
const textConfig = require('../textConfig.json');
const rootSize = textConfig.gridUnit;
const scaleBaseSize = textConfig.scaleBaseSize;
const bodyFamily = textConfig.fontFamily.join(', ');
const scaleRatio = textConfig.scaleRatio;
const capHeight = textConfig.capHeight;

let variableSheet = `
  --root-font-size: ${rootSize / 16 * 100}%;
  --body-font-family: ${bodyFamily};`;

textConfig.sizes.forEach((size) => {
  const fontSize = scaleBaseSize * Math.pow(scaleRatio, size.scale);
  const lineHeight = size.hasOwnProperty("lineHeight") ? (
    Math.ceil(size.lineHeight * fontSize / rootSize)
  ) : (
    Math.ceil((fontSize + .001) / rootSize)
  );
  const baselineShift = ((lineHeight * rootSize / fontSize) - capHeight) / 2;
  const typeVariables = `
  --${size.element}-font-size: ${fontSize / rootSize}rem; /* ~${Math.round(fontSize)}px (${scaleRatio}^${size.scale} @${scaleBaseSize}) */
  --${size.element}-line-height: ${lineHeight}rem; /* ~${Math.round(lineHeight * rootSize / fontSize * 10000) / 10000} */
  --${size.element}-baseline-offset: ${baselineShift * fontSize / rootSize}rem;
  --${size.element}-margin-bottom: ${size.bottom};
  --${size.element}-padding-top: ${size.top};`;

  variableSheet += typeVariables;
});

fs.writeFile('lib/theme/_text.css', ':root {' + variableSheet + '\n}');
