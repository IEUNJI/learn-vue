<template>
  <div id="app">
    <p>{{$store.state.age}}</p>
    <p>{{$store.getters.myAge}}</p>
    <button @click="add">更改</button>
    <button @click="minus">异步更改</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
    
  },
  mounted() {
    
  },
  methods: {
    add() {
      this.$store.commit('syncAdd', 10);
    },
    minus() {
      this.$store.dispatch('asyncMinus', 5);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  color: #2c3e50;
}
</style>
