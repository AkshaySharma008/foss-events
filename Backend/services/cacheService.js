const NodeCache = require("node-cache");
const shortid = require("shortid");

const nodeCache = new NodeCache();

const generateUniqueId = () => {
  let shortId = shortid.generate();
  if (nodeCache.has(shortId)) generateUniqueId();
  else return shortId;
};

const registerJwtToBlocklist = (token) => {
  let shortId = generateUniqueId();
  nodeCache.set(shortId, token, 900);
};

const checkJwtInBlocklist = (token) => {
  let flag = false;
  nodeCache.keys().forEach((value) => {
    if (String(nodeCache.get(value)) === String(token)) {
      flag = true;
    }
  });
  return flag;
};

module.exports = {
  registerJwtToBlocklist: registerJwtToBlocklist,
  checkJwtInBlocklist: checkJwtInBlocklist,
};
