<template>
  <div class="parent">
    <span>Parent {{ mny }}</span>
    <Son1 :mny="mny" @change="changeMoney" @click="say" />
    <!-- <Son2 :mny="mny" @update:mny="mny = $event" /> -->
    <!-- <Son2 :mny.sync="mny" /> -->
    <!-- <Son2 :value="mny" @input="mny = $event" /> -->
    <!-- <Son2 v-model="mny" /> -->
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
    say() {
      console.log('say');
    },
    changeMoney(newVal) {
      this.mny += newVal;
    }
  }
};
</script>
