module.exports = {
  pattern: '<%= pattern %>',
  description: '<%= description %>',
  action: (arg, options, env) => {
    console.log('<%= commandName %> was called!');
  },
};
