<template>
  <div
    class="
      fixed
      inset-0
      z-99
      flex flex-col
      items-center
      justify-center
      cursor-wait
    "
    @click.prevent="cancel"
  >
    <div
      class="
        text-center text-white
        p-8
        mx-8
        rounded-lg
        max-w-screen-sm
        bg-black bg-opacity-80
      "
    >
      <CircleLoading v-if="svg" />
      <p
        v-text="message"
        class="whitespace-pre-wrap font-bold px-8"
        v-if="message"
      />
    </div>
  </div>
</template>

<script>
import CircleLoading from "@luminexs/loader/src/CircleLoading.vue";

export default {
  components: {
    CircleLoading,
  },
  data() {
    return {
      items: [],
      mode: null,
      message: null,
      processing: false,
      svg: false,
    };
  },
  methods: {
    load() {
      this.svg = true;
      this.open("");
    },
    open(message) {
      if (message) this.message = message;
      if (!this.$parent) {
        this.$mount();
        document.body.appendChild(this.$el);
      }
      this.processing = true;
    },

    _open(message, mode) {
      this.open();
      this.mode = mode;
      this.message = this.getMessage(message);
      this.processing = false;
      setTimeout(() => {
        this.cancel();
      }, 2000);
    },

    getMessage(message) {
      if (message) return message;
      if (this.mode == "success") return "操作成功";
      return "操作失敗";
    },

    success(message) {
      this.svg = false;
      this._open(message, "success");
    },

    error(message) {
      this.svg = false;
      this._open(message, "error");
    },

    cancel() {
      if (this.mode) {
        this.clear();
        this.close();
      }
    },

    clear() {
      this.message = "";
      this.mode = null;
      this.svg = false;
    },

    close() {
      if (!this.mode) {
        this.processing = false;
        if (this.$el && document.body.contains(this.$el))
          document.body.removeChild(this.$el);
      }
    },
  },
  computed: {
    isSuccess() {
      return this.mode == "success";
    },
    isError() {
      return this.mode == "error";
    },
  },
};
</script>