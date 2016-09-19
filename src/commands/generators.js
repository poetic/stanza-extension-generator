import glob from 'glob';
import path from 'path';
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

  // TODO: We need a way to customize the description and command for generators
  _discoverGenerators() {
    const generators = glob.sync('generators/*/index.js', { cwd: this._extensionPath });

    generators.forEach(generatorFilePath => {
      const generatorPath = resolve.sync(`${this._extensionPath}/${generatorFilePath}`);
      const directory = path.dirname(generatorPath).split('/').pop();
      const namespace = `${this._extensionName}:${directory}`;
      const generator = {
        generatorPath,
        namespace,
      };

      this._yeomanEnv.register(generator.generatorPath, generator.namespace);
      this.createCommand(generator);
    });
  }

  createCommand(generator) {
    this._commander
      .command(`${generator.namespace} [name]`)
      .description('Extension generator -- we should be able to customize this.')
      .action((arg, options) => this.action(arg, options, generator));
  }

  action(arg, options, generator) {
    this._yeomanEnv.run(generator.namespace, { extensionName: this._extensionName });
  }
}

export default Generators;
