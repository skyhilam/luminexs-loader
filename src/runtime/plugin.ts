import { defineNuxtPlugin, useRuntimeConfig } from '#imports';

import { useLoader, _setLoaderConfig } from './composables/useLoader';

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig().public.loader as {
    successMessage: string;
    errorMessage: string;
    dismissDuration: number;
  };

  _setLoaderConfig(config);

  const loader = useLoader();

  return {
    provide: {
      loader,
    },
  };
});
