<template>
  <div>
    <div class="header">
      <img
        class="logo"
        src="https://dss2.bdstatic.com/5bVYsj_p_tVS5dKfpU_Y_D3/res/r/image/2021-3-4/hao123%20logo.png"
        alt="logo"
      />
      <span class="iconfont icon-liebiao" @click="showDrawer"></span>
    </div>
    <cube-drawer
      ref="drawer"
      title="请选择"
      :data="data"
      @select="selectHandler"
    ></cube-drawer>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    data() {
      const defaultActive = [
        {
          text: "全部课程",
          value: -1,
        },
      ];
      return this.categories.length ? [[...defaultActive, ...this.categories]] : [defaultActive];
    },
  },
  methods: {
    showDrawer() {
      this.$refs.drawer.show();
    },
    selectHandler(value) {
      this.$emit('change', value[0]);
    },
  },
};
</script>

<style lang="stylus">
.header {
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background: #2a2a2a;
}

.logo {
  width: 150px;
}

.icon-liebiao {
  color: #fff;
}
</style>