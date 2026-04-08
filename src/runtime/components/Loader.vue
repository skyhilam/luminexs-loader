<template>
  <Teleport to="body">
    <div
      v-if="state.isVisible.value"
      class="
        fixed
        inset-0
        z-[99999999999]
        flex flex-col
        items-center
        justify-center
        cursor-wait
      "
      @click.prevent="state.cancel"
    >
      <div
        class="
          text-center text-white
          p-8
          mx-8
          rounded-lg
          max-w-screen-sm
          bg-black/80
        "
      >
        <CircleLoading v-if="state.showSvg.value" />
        <p
          v-if="state.message.value"
          class="whitespace-pre-wrap font-bold px-8"
        >
          {{ state.message.value }}
        </p>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { _state as state } from '../composables/useLoader';

import CircleLoading from './CircleLoading.vue';
</script>
