<template>
  <div class="parent">
    <span>Parent {{ mny }}</span>
    <Son1 :mny="mny" @change="changeMoney" />
    <Son2 />
  </div>
</template>

<script>
import Son1 from "./Son1";
import Son2 from "./Son2";

export default {
  components: {
    Son1,
    Son2,
  },
  data() {
    return {
      mny: 100,
    };
  },
  methods: {
    changeMoney(newVal) {
      this.mny += newVal;
    }
  }
};
</script>
