export default class ExtensionGenerator {
  constructor(extensionPath) {
    this.description = 'Generate Stanza Extension';
    this.namespace = `${extensionPath}:extension`;
    this.path = `${__dirname}/extension/index.js`;

    this.command = `${extensionPath}:generate:extension <name>`;
    this.createCommand = true;
  }
}
