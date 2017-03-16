const postcss = require('postcss');

module.exports = postcss.plugin('postcss-comment-annotations', () => {
  return (css) => {
    let res = [];

    css.walkComments((comment) => {
      //const tags = comment.text.match(/(?:\r?\n|^)((?:\r?\n|.)+?)(?=\r?\n\r?\n|$)/g);
      comment.text.match(/\@\w+(\n|$)/).replace(/\n|$/, ' ');
      comment.text.match(/\n\t+/).replace(/\t+/, '');

      const tags = comment.text.match(/\@.+?(\n|$|\s.+?(\n|$))/gm);
      let tmp = {}

      if (tags) {
        tags.forEach((tag) => {
          // If the @definition has a value immediately it
          if (tag.match(/\@(.+?)\s(.+?)(\n|$)/g)) {
            let key = RegExp.$1;
            let val = RegExp.$2;

            // Create key:value pair
            tmp[key] = val;
          }

          if (tag.match(/\@(\w+)\s*(\n|$)/g)) {
            let key = RegExp.$1;
            tmp[key] = tmp[key] || true;
          }
        });

        if (Object.getOwnPropertyNames(tmp).length !== 0) {
          res.push(tmp);
        }
      }
    });
  };
});
