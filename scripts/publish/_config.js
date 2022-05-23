const path = require('path');

const packageUrl = 'https://registry.npmjs.org/ngx-maledict';
const dist = path.resolve(`${getRootPath()}/dist/ngx-maledict`);

function getRootPath() {
  const scriptsFolderIndex = __dirname.split('\\').findIndex((item) => item === 'scripts');

  return path.resolve(__dirname.split('\\').slice(0, scriptsFolderIndex).join('\\'));
}

module.exports = {
  packageUrl,
  dist,
};
