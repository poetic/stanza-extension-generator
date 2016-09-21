const yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  writing() {
    const { props } = this.options;

    // babel
    this.fs.copy(
      this.templatePath('.babelrc'),
      this.destinationPath('../.babelrc')
    );

    // editorconfig
    this.fs.copy(
      this.templatePath('.editorconfig'),
      this.destinationPath('../.editorconfig')
    );

    // esdoc
    this.fs.copy(
      this.templatePath('.esdoc.json'),
      this.destinationPath('../.esdoc.json')
    );

    // eslintignore
    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath('../.eslintignore')
    );

    // eslintrc
    this.fs.copy(
      this.templatePath('.eslintrc.js'),
      this.destinationPath('../.eslintrc.js')
    );

    // gitignore
    this.fs.copy(
      this.templatePath('.gitignore'),
      this.destinationPath('../.gitignore')
    );
  },
});
