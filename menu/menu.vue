<template>
  <lin-menu>
    <re-sub :data="data"></re-sub>
  </lin-menu>
</template>

<script>
import LinMenu from "./comps/lin-menu";
import ReSub from "./re-sub";

export default {
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    "lin-menu": LinMenu,
    "re-sub": ReSub,
  },
};
</script>