const resolve = require('resolve');

const appGeneratorPath = resolve.sync('./generators/app/index');
const commandGeneratorPath = resolve.sync('./generators/command/index');

module.exports.register = (stanza) => {
  stanza.registerGenerator(appGeneratorPath);
  stanza.registerGenerator(commandGeneratorPath);
};
