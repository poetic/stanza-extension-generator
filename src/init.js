import Extension from './extension';
import packageJson from '../package.json';

/**
 * Initialize extension to pass in object in which to register with and set
 * extension name from the package.json file
 *
 * @name initExtension
 * @function
 * @param {Object} registerWithObject Object in which to register commands and
 * generators with. i,e Stanza
 * @param {string} keyword If registering with another extension, what time should register?
 * i.e. stanza-extension, stanza-webpack, stanza-express
 * @returns {class} Instantiated extension class
 */
module.exports.initExtension = (registerWithObject, keyword) => {
  const extension = new Extension(packageJson.name, { registerWithObject, keyword });

  console.log('extension: ', extension);

  return extension;
};

