<template>
  <div class="app">
    <button @click="show">弹出消息</button>
  </div>
</template>

<script>
import LinUI from "./Message.js";
import Vue from 'vue';
Vue.use(LinUI);

export default {
  methods: {
    show() {
      this.$message.success({
        message: "你好",
        duration: 3000,
      });
    },
  },
};
</script>