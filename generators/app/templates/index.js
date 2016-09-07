const fs = require('fs');
const resolve = require('resolve');

const findExtensionCommands = register => {
  fs.readdirSync(`${__dirname}/commands`).map(file => {
    try {
      const commandPath = resolve.sync(file, { moduleDirectory: 'commands' });
      const command = require(commandPath);

      register(command);
    } catch (error) {
      console.warn(error);
    }
  });
};

module.exports.register = stanza => {
  findExtensionCommands(stanza.registerCommand);
};
