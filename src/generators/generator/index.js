const chalk = require('chalk');
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
        message: 'What will we be generatoring?',
      },
      {
        type: 'input',
        name: 'command',
        message: 'What command should be us to call this generator?',
        default: `generate-${this.options.name}`,
      },
    ];

    return this.prompt(prompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  default() {
    console.log('__dirname: ', __dirname);
    // const test = path.resolve('../comm')
    // if (path.basename(this.destinationPath()) !== this.props.name) {
    //   this.log(
    //     'Your generator must be inside a folder named ' + this.props.name + '\n' +
    //     'I\'ll automatically create this folder.'
    //   );
    //   mkdirp(this.props.name);
    //   this.destinationRoot(this.destinationPath(this.props.name));
    // }

    // var readmeTpl = _.template(this.fs.read(this.templatePath('README.md')));

    // this.composeWith('node:app', {
    //   options: {
    //     babel: false,
    //     boilerplate: false,
    //     name: this.props.name,
    //     projectRoot: 'yeoman',
    //     skipInstall: this.options.skipInstall,
    //     readme: readmeTpl({
    //       generatorName: this.props.name,
    //       yoName: this.props.name.replace('generator-', '')
    //     })
    //   }
    // }, {
    //   local: require('generator-node').app
    // });

    // this.composeWith('generator:subgenerator', {
    //   arguments: ['app']
    // }, {
    //   local: require.resolve('../subgenerator')
    // });
  },

  writing() {
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
