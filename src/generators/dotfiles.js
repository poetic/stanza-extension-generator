export default class DotfilesGenerator {
  constructor(extensionPath) {
    this.description = 'Generate Stanza Dotfiles';
    this.namespace = `${extensionPath}:dotfiles`;
    this.path = `${__dirname}/dotfiles/index.js`;

    this.command = `${extensionPath}:generate:dotfiles`;
  }

  action(arg, yeomanEnv, options = {}) {
    yeomanEnv.run(this.namespace, { extensionName: arg });
  }
}
