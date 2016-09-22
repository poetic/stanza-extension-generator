import yeoman from 'yeoman-environment';
import Extension from '../../stanza-cli/src/extension';

/**
 * <%= extensionName %> representing an Extension
* */
class <%= extensionName %> extends Extension {
  constructor(name, registerWithObject, keyword) {
    super(name, registerWithObject, keyword, __dirname);
  }
}

export default <%= extensionName %>;
