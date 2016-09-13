const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  initializing() {
    this.destinationRoot(`./${this.options.extensionName}`);
  },
  prompting() {
    this.log(yosay(
      `Welcome to the wonderful ${chalk.red('stanza-extension:extension')} generator!`
    ));

    const prompts = [
      {
        default: this.options.extensionName,
        message: 'What is the extension name?',
        name: 'extensionName',
        type: 'input',
        value: this.options.extensionName,
      },
      {
        default: this.name,
        message: 'What is your name?',
        name: 'authorName',
        type: 'input',
      },
      {
        default: '0.0.0',
        message: 'What is the version?',
        name: 'version',
        type: 'input',
      },
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },
  writing() {
    mkdirp('src/commands');
    mkdirp('src/generators');
  },
  default() {
    this.composeWith('stanza-extension-generator:dotfiles', {
      options: {
        props: this.props,
      },
    });
  },
  install() {
    this.installDependencies();
  },
});
