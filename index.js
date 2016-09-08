module.exports.register = (object, keyword) => {
  require('./lib/init').initExtension(object, keyword);
};
