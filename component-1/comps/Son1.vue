<template>
  <div class="son1">
    <span>Son1 {{ mny }}</span>
    <button @click="changeMoney">修改</button>
  </div>
</template>

<script>
export default {
  props: {
    mny: {
      type: Number,
    },
  },
  methods: {
    changeMoney() {
      this.$emit('change', 100);
    },
  },
};
</script>
