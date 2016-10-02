export default class <%= generatorClassName %>Generator {
  constructor(extensionPath) {
    this.description = '<%= description %>';
    this.namespace = `${extensionPath}:<%= name %>`;
    this.path = `${__dirname}/<%= name %>/index.js`;

    this.command = '<%= command %>';
  }

  action(arg, yeomanEnv, options = {}) {
    yeomanEnv.run(this.namespace, { name: arg });
  }
}
