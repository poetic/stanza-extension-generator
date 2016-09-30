import requireg from 'requireg';

const Extension = requireg('stanza/src/extension').default;

/**
 * Class representing an Extension
* */
export default class StanzaExtensionGenerator extends Extension {
  constructor(name, registerWithObject, keyword) {
    super(name, registerWithObject, keyword);

    this._extensionPath = __dirname;

    this.discoverCommands(`${this._extensionPath}/commands`);
  }
}
