import path from 'path'

export default function MyModule(moduleOptions) {

  // Register a new plugin
  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: '@luminexs/loader/index.js',
    options: moduleOptions, // Pass module options to the plugin
    path: path.resolve(__dirname, 'plugin.js')
  });

  
}

// Required for Nuxt.js to recognize this as a module
module.exports.meta = require('./package.json');