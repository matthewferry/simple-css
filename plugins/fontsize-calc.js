const rootSize = 12;
const bodySize = 16;
const scaleSize = 16;
const scaleRatio = 1.333333;
const scaleIncrement = 0;
const fontSize = scaleSize * Math.pow(scaleRatio, scaleIncrement);
const lineHeight = 1;
const capHeight = 0.705;
const bottomSpace = 0;
const baselineShift = fontSize / 2 * ((lineHeight * rootSize / fontSize) - capHeight) / rootSize + .00001;
const rhythmReset = bottomSpace - baselineShift;
const typeCss = `
  font-size: ${fontSize/rootSize}rem;
  line-height: ${lineHeight}rem;
  margin: 0 0 ${rhythmReset}rem;
  padding-top: ${baselineShift}rem;
  `;

console.log(typeCss);
