const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');
const mkdirp = require('mkdirp');

module.exports = yeoman.Base.extend({
  initializing() {
    this.extensionClassName = this.options.extensionName
    .replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase())
    .replace(/-/g, '');

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
        default: '',
        message: 'What does this extension do?',
        name: 'description',
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

    // package.json
    this.fs.copyTpl(
      this.templatePath('_package.json'),
      this.destinationPath('package.json'),
      {
        extensionName: this.props.extensionName,
        version: this.props.version || '0.0.0',
        authorName: this.props.authorName || 'Poetic Systems',
        description: this.props.description || '',
      }
    );

    // README
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      {
        extensionName: this.props.extensionName,
      }
    );

    // init.js
    this.fs.copyTpl(
      this.templatePath('index.js'),
      this.destinationPath('index.js'),
      {
        extensionName: this.extensionClassName,
      }
    );

    // extension.js
    this.fs.copyTpl(
      this.templatePath('extension.js'),
      this.destinationPath('src/extension.js'),
      {
        extensionName: this.extensionClassName,
      }
    );
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
