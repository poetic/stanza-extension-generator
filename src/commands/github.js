/*
 * @example
 * */
import requireg from 'requireg';

const Command = requireg('stanza/src/command').default;

/**
 * Class representing a Stanza Extension command
 *
 * @extends {Command}
 */
export default class Github extends Command {
  /**
   * @param {string} extensionName Extension Name
   * @param {string} extensionPath Absolute path of the extension
   * @param {Object} commander Commanderjs
   */
  constructor(extensionName, extensionPath, commander) {
    super(extensionName, extensionPath, commander);

    this.setCommand('github <action>');
    this.setDescription('Run a hub command through Stanza');
    this.setAction(this.action);

    this.registerCommand();
  }

  /**
   * @param {string} args Arguments passed in with the command
   * @param {Object} [options={}] Additional arguments passed in with the command
   */
  action(args, options = {}) {
    console.log(`You can find me at ${__filename}.`);
  }
}
