import Extension from '../../stanza-cli/src/extension';

/**
 * Class representing an Extension
* */
class StanzaExtensionGenerator extends Extension {
  constructor(name, registerWithObject, keyword) {
    super(name, registerWithObject, keyword, __dirname);

    this._extensionPath = __dirname;

    this.discoverCommands(`${this._extensionPath}/commands`);
  }
}

export default StanzaExtensionGenerator;
