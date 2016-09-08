const resolve = require('resolve');
const glob = require('glob');
const path = require('path');

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
  constructor(registerWithObject, keyword) {
    this.registerWithObject = registerWithObject;
    this.keyword = keyword;
  }

  /**
   * Return the extension name
   *
   * @name name
   * @memberof Extension
   * @returns {string} Extension name
   */
  get name() {
    return this._name;
  }

  /**
   * Set the extension name
   *
   * This will be used for the generators namespaces
   *
   * @name name
   * @memberof Extension
   * @param {String} name New extension name
   * @returns {undefined}
   */
  set name(name) {
    this._name = name;
  }

  /**
   * Discover command and generators within the extension
   *
   * @name discoverChildren
   * @memberof Extension
   */
  discoverChildren() {
    const { registerCommand, registerGenerator } = this.registerWithObject;

    // TODO: separtate out commands and generators search
    const commands = glob.sync('../commands/**.js', { cwd: __dirname });

    commands.forEach(commandFileName => {
      const commandPath = resolve.sync(`./${commandFileName}`);
      const command = require(commandPath);

      registerCommand(command);
    });

    const generators = glob.sync('../generators/*/index.js', { cwd: __dirname });

    generators.forEach(generator => {
      const generatorPath = resolve.sync(`./${generator}`);
      const directory = path.dirname(generatorPath).split('/').pop();
      const namespace = `${this._name}:${directory}`;

      console.log('namespace: ', namespace);

      registerGenerator(generatorPath, namespace);
    });
  }
}

export default Extension;
