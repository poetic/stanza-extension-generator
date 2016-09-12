import resolve from 'resolve';
import glob from 'glob';
import path from 'path';
import yeoman from 'yeoman-environment';

/**
 * Class representing an Extension
* */
class Extension {
  /**
   * When an extension is instantiated, pass in the object in which to register
   * with and the module keyword; Run discoverChildren to register commands and
   * generators with Stanza.
   *
   * @name constructor
   * @memberof Extension
   * @param {Object} registerWithObject Object in which to register commands and
   * generators with. i.e Stanza
   * @param {string} keyword If register another extension, what type?
   * @returns {undefined}
   */
  constructor(name, { registerWithObject, keyword }) {
    this._keyword = keyword || '';
    this._name = name;
    this._registerWithObject = registerWithObject || {};
    this._yeomanEnv = yeoman.createEnv();

    this._commands = [];
    this._generators = [];

    this.discoverCommands();
    this.discoverGenerators();
  }

  /**
   * Find extenstion commands and register them with Stanza
   *
   * @name discoverCommands
   * @memberof Extension
   * @returns {undefined}
   */
  discoverCommands() {
    const commands = glob.sync('./commands/**.js', { cwd: __dirname });

    commands.forEach(commandFileName => {
      const commandPath = resolve.sync(`./${commandFileName}`);
      const command = require(commandPath);

      this._registerWithObject.commander
        .command(command.pattern)
        .description(command.description)
        .action((arg, options) => command.action(arg, options, {}));

      this._commands.push(command);
    });
  }

 /**
   * Find extenstion generators and register them with Stanza
   *
   * @name discoverGenerators
   * @memberof Extension
   * @returns {undefined}
   */
  discoverGenerators() {
    const generators = glob.sync('./generators/*/index.js', { cwd: __dirname });

    generators.forEach(generator => {
      const generatorPath = resolve.sync(`./${generator}`);
      const directory = path.dirname(generatorPath).split('/').pop();
      const namespace = `${this._name}:${directory}`;

      this._generators.push({ generatorPath, namespace });

      this._yeomanEnv.register(generatorPath, namespace);
    });
  }
}

export default Extension;
