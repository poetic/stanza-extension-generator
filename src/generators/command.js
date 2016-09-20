export default class CommandGenerator {
  constructor(extensionPath) {
    this.description = 'Generate Stanza Command';
    this.namespace = `${extensionPath}:command`;
    this.path = `${__dirname}/command/index.js`;

    this.command = `${extensionPath}:generate:command <name>`;
    this.createCommand = true;
  }
}
