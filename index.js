const resolve = require('resolve');
const fs = require('fs');

const appGeneratorPath = resolve.sync('./generators/app/index');
const commandGeneratorPath = resolve.sync('./generators/command/index');

const findExtensionCommands = registerFunction => {
  fs.readdirSync(`${__dirname}/commands`).map(file => {
    try {
      const commandPath = resolve.sync(file, { moduleDirectory: 'commands' });
      const command = require(commandPath);

      registerFunction(command);
    } catch (error) {
      console.warn(error);
    }
  });
};

module.exports.register = (stanza) => {
  stanza.registerGenerator(appGeneratorPath, 'stanza-extension');
  stanza.registerGenerator(commandGeneratorPath, 'stanza-extension:command');

  findExtensionCommands(stanza.registerCommand);
};
