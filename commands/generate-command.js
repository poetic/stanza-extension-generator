module.exports = {
  pattern: 'extension-generator:generate:command [name]',
  description: 'Generate Stanza Extension Command',
  action: (arg, options, { yeomanEnv }) => {
    yeomanEnv.run('stanza-extension-generator:command', { commandName: arg });
  },
};
