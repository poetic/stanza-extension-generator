module.exports = {
  pattern: 'extension-generator:generate [name]',
  description: 'Generate Stanza Extension',
  action: (arg, options, { yeomanEnv }) => {
    yeomanEnv.run('stanza-extension-generator:extension', { extensionName: arg });
  },
};
