/*
 * @example
 * */
import Command from '../../../stanza-cli/src/command';

export default class Github extends Command {
  constructor(extensionName, extensionPath, commander) {
    super(extensionName, extensionPath, commander);

    this.setCommand('github <action>');
    this.setDescription('Run a hub command through Stanza');
    this.setAction(this.action);

    this.registerCommand();
  }

  action(args, options = {}) {
    console.log(`You can find me at ${__filename}.`);
  }
}
