<template>
  <div class="re-sub">
    <template v-for="item in data">
      <lin-sub-menu
        :key="item.id"
        v-if="item.children && item.children.length > 0"
      >
        <template v-slot:title>{{ item.name }}</template>
        <re-sub :data="item.children"></re-sub>
      </lin-sub-menu>
      <lin-menu-item :key="item.id" v-else>
        {{ item.name }}
      </lin-menu-item>
    </template>
  </div>
</template>

<script>
import LinSubMenu from "./comps/lin-submenu";
import LinMenuItem from "./comps/lin-menu-item";

export default {
  name: "re-sub",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components: {
    "lin-sub-menu": LinSubMenu,
    "lin-menu-item": LinMenuItem,
  },
};
</script>