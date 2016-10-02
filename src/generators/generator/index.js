const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const yeoman = require('yeoman-generator');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
  initializing() {
    this.generatorClassName = this.options.name
    .replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
    .replace(/-/g, '');

    this.destinationRoot(`${this.destinationRoot()}/src/generators/${this.options.name}`);
  },

  prompting() {
    this.log(yosay(
      `Welcome to the wonderful ${chalk.red('generator-stanza-extension:generate:generator')}
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
        name: 'description',
        message: 'What will this generate?',
      },
      {
        type: 'input',
        name: 'command',
        message: 'What command should be called to use this generator?',
        default: `generate-${this.options.name}`,
      },
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  default() {
    try {
      fs.statSync('../../commands/generators.js');
    } catch (error) {
      this.generateCommand = true;
    }
  },

  writing() {
    if (this.generateCommand) {
      this.fs.copy(
        this.templatePath('generators.js'),
        this.destinationPath('../../commands/generators.js')
      );
    }

    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('index.js')
    );

    this.fs.copyTpl(
      this.templatePath('command.js'),
      this.destinationPath(`../${this.props.name}.js`),
      {
        generatorClassName: this.generatorClassName,
        name: this.props.name,
        description: this.props.description,
        command: this.props.command,
      }
    );

    this.fs.copy(
      this.templatePath('example.js'),
      this.destinationPath('templates/example.js')
    );
  },
});
