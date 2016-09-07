module.exports = {
  pattern: 'extension-generator:generate:command [name]',
  description: 'Generate Stanza Extension Command',
  action: (arg, options, { yeomanEnv }) => {
    yeomanEnv.run('stanza-extension:command', { commandName: arg });
  },
};
