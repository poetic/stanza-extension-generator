import requireg from 'requireg';

const Command = requireg('stanza/src/command').default;

export default class <%= name %> extends Command {
  constructor(extensionName, extensionPath, commander) {
    super(extensionName, extensionPath, commander);

    this.setCommand('<%= pattern %>');
    this.setDescription('<%= description %>');
    this.setAction(this.action);

    this.registerCommand();
  }

  action(args, options = {}) {
    console.log(`You can find me at ${__filename}.`);
  }
}
