module.exports = {
  pattern: 'extension-generator:generate [name]',
  description: 'Generate Stanza Extension',
  action: (arg, options, { yeomanEnv }) => {
    console.log('arg: ', arg);
    console.log('options: ', options);

    // yeomanEnv.run('stanza-extension-generator:extension', { extensionName: arg });
  },
};
