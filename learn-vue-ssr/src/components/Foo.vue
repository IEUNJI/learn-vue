<template>
  <div>
    <span>Foo</span>
    <span>{{ $store.state.name }}</span>
    <button @click="clickMe">btn</button>
  </div>
</template>

<script>
export default {
  asyncData(store) {
    return store.dispatch("changeName");
  },
  mounted() {
    this.$store.dispatch("changeName");
  },
  methods: {
    clickMe() {
      alert("click!");
    },
  },
};
</script>