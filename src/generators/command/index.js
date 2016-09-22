'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.destinationRoot(`${this.destinationRoot()}/src/commands`);
    console.log('this.destinationRoot(()): ', this.destinationRoot());
  },
  prompting: function () {
    this.log(yosay(
      'Welcome to the wonderful ' + chalk.red('generator-stanza-extension:generate:command') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'commandName',
        message: 'what is the name of your command?',
        default: this.options.commandName,
      },
      {
        type: 'input',
        name: 'pattern',
        message: 'What is the cmd pattern?',
        default: `${this.options.commandName} [params]`,
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

  writing: function () {
    console.log('this.props: ', this.props);
    this.fs.copyTpl(
      this.templatePath('commands/command-name.js'),
      this.destinationPath(`commands/${this.props.commandName}.js`),
      {
        commandName: this.options.commandName,
        pattern: this.props.pattern,
        description: this.props.description,
      }
    );
  },

  install: function () {
    // this.installDependencies();
  }
});
