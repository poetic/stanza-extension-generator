const resolve = require('resolve');
const fs = require('fs');
const glob = require('glob');
const path = require('path');
const packageJson = require('./package.json');

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

const findExtensionGenerators = registerFunction => {
  const generators = glob.sync('generators/*/index.js', { cwd: __dirname });

  generators.forEach(generator => {
    const generatorPath = resolve.sync(`./${generator}`);
    const directory = path.dirname(generatorPath).split('/').pop();
    const namespace = `${packageJson.name}:${directory}`;

    registerFunction(generatorPath, namespace);
  });
};

module.exports.register = (stanza) => {
  findExtensionCommands(stanza.registerCommand);
  findExtensionGenerators(stanza.registerGenerator);
};
