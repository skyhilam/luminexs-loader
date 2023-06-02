import path from 'path'

export default function MyModule(moduleOptions) {


  // Register a new plugin
  this.addPlugin(path.resolve(__dirname, 'plugin.js'));


  
}

// Required for Nuxt.js to recognize this as a module
module.exports.meta = require('../package.json');