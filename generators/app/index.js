'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  initializing: function () {
    this.destinationRoot(`./${this.options.extensionName}`);
    console.log('this.destinationRoot(): ', this.destinationRoot());
  },
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the wonderful ' + chalk.red('stanza-extension:extension') + ' generator!'
    ));

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'What is the extension name?',
        default: this.options.extensionName,
      },
      {
        type: 'input',
        name: 'name',
        message: 'What is your name?',
        default: this.name,
      },
      {
        type: 'input',
        name: 'version',
        message: 'What is the version?',
        default: '0.0.1',
      },
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    mkdirp('commands');
    mkdirp('generators');

    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('index.js')
    )

    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        name: this.options.extensionName,
        version: this.props.version || '0.0.1',
        author: this.props.author || 'Poetic Systems',
      }
    );
  },

  install: function () {
    this.installDependencies();
  }
});
