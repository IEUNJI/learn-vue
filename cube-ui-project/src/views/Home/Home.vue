<template>
  <div class="home">
    <HomeHeader :categories="categories" @change="change"></HomeHeader>
    {{categories}}
  </div>
</template>

<script>
import HomeHeader from "./HomeHeader";

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState } = createNamespacedHelpers("home");

import * as types from '@/store/actions-type';

export default {
  components: {
    HomeHeader,
  },
  computed: {
    ...mapState(["categories"]),
  },
  methods: {
    ...mapActions([types.SET_CATEGORIES]),
    change(value) {
      console.log(value);
    }
  },
  mounted() {
    this[types.SET_CATEGORIES]().then(() => {
      console.log("ajax end", this, types);
    });
  },
};
</script>
