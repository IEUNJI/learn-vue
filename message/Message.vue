<template>
  <div class="msg" v-if="layers.length > 0">
    <div class="layers" v-for="item in layers" :key="item.id">
      {{ item.message + item.id }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      layers: [],
    };
  },
  mounted() {
    this.id = 0;
  },
  methods: {
    remove(layer) {
      clearTimeout(layer.timer);
      this.layers = this.layers.filter(item => item.id !== layer.id);
    },
    add(options) {
      const layer = {
        ...options,
        id: this.id++,
      };
      layer.timer = setTimeout(() => {
        this.remove(layer);
      }, options.duration);
      this.layers.push(layer);
    },
  },
};
</script>