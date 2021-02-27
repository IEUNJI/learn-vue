<template>
  <div class="son1">
    <!-- <span>Son1 {{ mny }}</span> -->
    <button @click="changeMoney">修改</button>
    <Grandson1 v-bind="$attrs" v-on="$listeners" />
  </div>
</template>

<script>
import Grandson1 from "./Grandson1";

export default {
  inheritAttrs: false,
  // props: {
  //   mny: {
  //     type: Number,
  //   },
  // },
  methods: {
    changeMoney() {
      this.$emit("change", 100);
      console.log(this);
    },
  },
  components: {
    Grandson1,
  },
};
</script>
