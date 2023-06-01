import Vue from 'vue';

// Import the component
import Loader from '@luminexs/loader/Loader.vue';

// Create a new Vue.js plugin
const MyModulePlugin = {
  install(Vue, options) {
    Vue.prototype.$loader = new (Vue.extend(Loader))({ propsData: options })
  },
};

// Register the plugin
Vue.use(MyModulePlugin);