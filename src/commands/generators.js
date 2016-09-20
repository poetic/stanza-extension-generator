import glob from 'glob';
import resolve from 'resolve';
import yeoman from 'yeoman-environment';

class Generators {
  constructor(extensionName, extensionPath, commander) {
    this._commander = commander;
    this._extensionName = extensionName;
    this._extensionPath = extensionPath;
    this._yeomanEnv = yeoman.createEnv();

    this._generators = [];

    this._discoverGenerators();
  }

  _discoverGenerators() {
    const generators = glob.sync('generators/*.js', { cwd: this._extensionPath });

    generators.forEach(generatorFilePath => {
      const generatorPath = resolve.sync(`${this._extensionPath}/${generatorFilePath}`);
      const Generator = require(generatorPath).default;
      const generator = new Generator(this._extensionName);

      this._yeomanEnv.register(generator.path, generator.namespace);

      this.createCommand(generator);
    });
  }

  createCommand(generator) {
    this._commander
      .command(generator.command)
      .description(generator.description)
      .action((arg, options) => generator.action(arg, this._yeomanEnv, options));
  }
}

export default Generators;
