import {
  addComponent,
  addPlugin,
  createResolver,
  defineNuxtModule,
} from '@nuxt/kit';

export interface LoaderModuleOptions {
  /** Default success message */
  successMessage?: string;
  /** Default error message */
  errorMessage?: string;
  /** Auto-dismiss duration in ms (default: 2000) */
  dismissDuration?: number;
}

export default defineNuxtModule<LoaderModuleOptions>({
  meta: {
    name: '@luminexs/loader',
    configKey: 'loader',
    compatibility: {
      nuxt: '^3.10.0',
    },
  },
  defaults: {
    successMessage: '操作成功',
    errorMessage: '操作失敗',
    dismissDuration: 2000,
  },
  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);

    // Provide runtime config
    nuxt.options.runtimeConfig.public.loader = {
      successMessage: options.successMessage ?? '操作成功',
      errorMessage: options.errorMessage ?? '操作失敗',
      dismissDuration: options.dismissDuration ?? 2000,
    };

    // Register the plugin (provides $loader)
    addPlugin(resolve('./runtime/plugin'));

    // Auto-register components
    addComponent({
      name: 'LuminexsLoader',
      filePath: resolve('./runtime/components/Loader.vue'),
    });

    addComponent({
      name: 'CircleLoading',
      filePath: resolve('./runtime/components/CircleLoading.vue'),
    });
  },
});
