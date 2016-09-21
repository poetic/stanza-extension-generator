// TODO: This should be imported from the globally installed Stanza CLI
import Extension from '../../stanza-cli/src/extension';

/**
 * Class representing an Extension
* */
export default class StanzaExtensionGenerator extends Extension {
  constructor(name, registerWithObject, keyword) {
    super(name, registerWithObject, keyword, __dirname);

    this._extensionPath = __dirname;

    this.discoverCommands(`${this._extensionPath}/commands`);
  }
}
