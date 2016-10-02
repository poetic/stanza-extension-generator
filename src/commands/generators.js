import requireg from 'requireg';
import glob from 'glob';
import resolve from 'resolve';
import yeoman from 'yeoman-environment';

const Command = requireg('stanza/src/command').default;

/**
 * Class representing a Stanza Extension Command
 *
 * The generators command will search for any Yeoman generators found within
 * a Stanza extension
 *
 * @extends {Command}
 */
export default class Generators extends Command {
  /**
   * @param {string} extensionName Extension Name
   * @param {string} extensionPath Absolute path of the extension
   * @param {Object} commander Commanderjs
   */
  constructor(extensionName, extensionPath, commander) {
    super(extensionName, extensionPath, commander);

    this._yeomanEnv = yeoman.createEnv();
    this._generators = [];

    this._discoverGenerators();
  }

  /**
   * Discover Yeoman generators belonging to this extension and register them with
   * the Yeoman enviornment
   *
   * @return {undefined}
   */
  _discoverGenerators() {
    const generators = glob.sync('generators/*.js', { cwd: this._extensionPath });

    generators.forEach(generatorFilePath => {
      const generatorPath = resolve.sync(`${this._extensionPath}/${generatorFilePath}`);
      const Generator = require(generatorPath).default;
      const generator = new Generator(this._extensionName);

      this._generators.push({ path: generator.path, namespace: generator.namespace });

      this._yeomanEnv.register(generator.path, generator.namespace);

      this.createCommand(generator);
    });
  }

  /**
   * Register the Yeoman generators with Commanderjs
   *
   * @param {Object} generator Yeoman generator object with the command, description and action
   * @return {undefined}
   */
  createCommand(generator) {
    this._commander
      .command(generator.command)
      .description(generator.description)
      .action((arg, options) => generator.action(arg, this._yeomanEnv, options));
  }
}
