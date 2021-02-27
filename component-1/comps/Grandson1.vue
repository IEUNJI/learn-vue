<template>
  <div class="grandson1">Grandson1</div>
</template>

<script>
export default {
  inject: ['vm'],
  mounted() {
    console.log(this.vm);
    // this.$emit('click');
  }
};
</script>
