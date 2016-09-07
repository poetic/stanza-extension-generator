module.exports = {
  pattern: 'extension-generator:generate:generator [name]',
  description: 'Generate Stanza Extension Generator',
  action: (arg, options, { yeomanEnv }) => {
    console.log('arg: ', arg);
    console.log('options: ', options);
    console.log('yeomanEnv: ', yeomanEnv);
  },
};
