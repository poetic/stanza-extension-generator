import yeoman from 'yeoman-environment';
import Extension from '../../stanza-cli/src/extension';

/**
 * Class representing an Extension
* */
class StanzaExtensionGenerator extends Extension {
  constructor(name, registerWithObject, keyword) {
    super(name, registerWithObject, keyword, __dirname);
  }
}

export default StanzaExtensionGenerator;
