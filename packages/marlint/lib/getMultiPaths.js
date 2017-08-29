const getOptionsForPath = require('./getOptionsForPath');

/**
 * Convert list of path for lerna monorepo into array of array containing the
 * path grouped by its package name
 */
const getMultiPaths = (paths, options) => {
  const multiPathMap = {};
  const multiPaths = [];
  let index = 0;

  paths.forEach(path => {
    const packageName = /packages\//.test(path)
      ? path.replace(/packages\/([\w-.]+)\/.*/, '$1')
      : null;

    if (multiPathMap[packageName] === undefined) {
      multiPathMap[packageName] = index;
      index++;
    }

    const pushIndex = multiPathMap[packageName];
    if (multiPaths[pushIndex] === undefined) {
      multiPaths[pushIndex] = [];
    }

    multiPaths[pushIndex].push(path);
  });

  // return paths with their merged config
  return multiPaths.map(paths => ({
    paths,
    options: getOptionsForPath(paths[0], options),
  }));
};

module.exports = getMultiPaths;
