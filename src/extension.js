import requireg from 'requireg';

const Extension = requireg('stanza/src/extension').default;

/**
 * Class representing an Extension
 *
 * @extends {Extension}
* */
export default class StanzaExtensionGenerator extends Extension {
  /**
   * @param {string} name Name of the Stanza Extension
   * @param {Object} registerWithObject Object in which to register commands and
   * generators with. i.e Stanza
   * @param {string} keyword If registering another extension, what type?
   */
  constructor(name, registerWithObject, keyword) {
    super(name, registerWithObject, keyword);

    this._extensionPath = __dirname;

    this.discoverCommands(`${this._extensionPath}/commands`);
  }
}
