const yeoman = require('yeoman-generator');

module.exports = yeoman.Base.extend({
  initializing() {
    console.log('You can find documentation on how to write your own Yeoman generator at http://yeoman.io/authoring/');
  },
});
