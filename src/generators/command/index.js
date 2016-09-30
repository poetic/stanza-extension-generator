const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
  initializing() {
    this.commandClassName = this.options.name
    .replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
    .replace(/-/g, '');

    this.destinationRoot(`${this.destinationRoot()}/src/commands`);
  },
  prompting() {
    this.log(yosay(
      `Welcome to the wonderful ${chalk.red('generator-stanza-extension:generate:command')}
      generator!`
    ));

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Name?',
        default: this.options.name,
      },
      {
        type: 'input',
        name: 'pattern',
        message: 'What is the pattern?',
        default: `${this.options.name} [params]`,
      },
      {
        type: 'input',
        name: 'description',
        message: 'What does your command do?',
      },
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing() {
    this.fs.copyTpl(
      this.templatePath('command-name.js'),
      this.destinationPath(`${this.props.name}.js`),
      {
        name: this.commandClassName,
        pattern: this.props.pattern,
        description: this.props.description,
      }
    );
  },
});
