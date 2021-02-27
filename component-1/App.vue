<template>
  <div id="root">
    <Parent />
  </div>
</template>

<script>
import Parent from "./comps/Parent";

export default {
  provide() {
    return {
      vm: this
    };
  },
  data() {
    return {
      name: 'app'
    };
  },
  components: {
    Parent,
  },
};
</script>
