const resolve = require('resolve');
const glob = require('glob');
const path = require('path');
const packageJson = require('./package.json');

const findExtensionCommands = registerFunction => {
  const commands = glob.sync('commands/**.js', { cwd: __dirname });

  commands.forEach(commandFileName => {
    const commandPath = resolve.sync(`./${commandFileName}`);
    const command = require(commandPath);

    registerFunction(command);
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
