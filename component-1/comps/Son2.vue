<template>
  <div class="son2">
    <span>Son2 {{mny}}</span>
    <button @click="changeMoney">修改</button>
  </div>
</template>

<script>
export default {
  props: {
    mny: {
      type: Number
    },
    value: {
      type: Number
    },
  },
  methods: {
    changeMoney() {
      this.$emit('update:mny', 50);
      this.$emit('input', 50);
    },
  }
};
</script>
