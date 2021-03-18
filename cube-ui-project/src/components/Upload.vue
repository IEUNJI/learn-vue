<template>
  <input type="file" accept="image/*" @change="change" ref="input" />
</template>

<script>
export default {
  methods: {
    change(e) {
      const file = e.target.files[0];
      const fd = new FormData();
      fd.append('file', file);
      this.$emit('change', fd);
    },
    show() {
      this.$refs.input.click();
    }
  },
};
</script>