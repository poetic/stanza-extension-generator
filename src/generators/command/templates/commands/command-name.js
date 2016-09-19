module.exports = {
  pattern: '<%= pattern %>',
  description: '<%= description %>',
  action: (arg, options, env) => {
    console.log('<%= commandName %> was called!');
  },
};


// TODO: Update to generate extension class
/*
class GenerateExtension {
  constructor(commander) {
    commander
    .command('extension-generator:generate [name]') // this should be filled out by the prompts
    .description('Generate Stanza Extension') // this should be filled out by the promps
      .action((arg, options) => this.action(arg, options));
  }

  action(arg, options) {
    console.log(`Find this commands actions at ${__filename}`);
    console.log(`Argument passed: ${arg}`);
  }
}

export default GenerateExtension;
*/
