const postcss = require('postcss');

module.exports = postcss.plugin('postcss-comment-annotation', () => {
  return (root, result) => {
    result.commentAnnotations = [];

    root.walkComments((comment) => {
      const annotations = comment.text.match(/(\@(?:\r?\n|.)+?)(?=\@|$)/g)
      let annotationsBlock = {};

      if (annotations) {
        annotations.forEach((annotation) => {
          // Match @rule with value after
          if (annotation.match(/\@(\w*)\s((?:\r?\n|.)*?)(?=\r?\n\r?\n|$)/g)) {
            let key = RegExp.$1;
            let val = RegExp.$2;

            val.replace(/^\s/g, '');

            // Create key:value pair
            annotationsBlock[key] = val;
          }

          // Match single @rule and treat as true
          if (annotation.match(/\@(\w+)\s*(\n|$)/g)) {
            let key = RegExp.$1;
            annotationsBlock[key] = annotationsBlock[key] || true;
          }
        });

        if (Object.getOwnPropertyNames(annotationsBlock).length !== 0) {
          annotationsBlock.type = 'comment-annotation';
          annotationsBlock.plugin = 'comment-annotation';
          result.commentAnnotations.push(annotationsBlock);
        }
      }
    });
  }
});
