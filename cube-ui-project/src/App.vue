<template>
  <div id="app">
    <div class="container">
      <transition :name="move">
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
      </transition>
      <transition :name="move">
          <router-view v-if="!$route.meta.keepAlive"></router-view>
      </transition>
    </div>
    <div class="footer">
      <cube-tab-bar
        v-model="selectedLabelDefault"
        :data="tabs"
        @change="changeHandler"
      >
      </cube-tab-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedLabelDefault: "/",
      tabs: [
        {
          label: "首页",
          value: "/",
          icon: "iconfont icon-xingqiu",
        },
        {
          label: "课程",
          value: "/course",
          icon: "iconfont icon-react",
        },
        {
          label: "个人中心",
          value: "/profile",
          icon: "iconfont icon-xiaolian",
        },
      ],
      move: "slide-left",
    };
  },
  watch: {
    $route: {
      handler(to, from) {
        this.selectedLabelDefault = to.path;
        if (to && from) {
          if (to.meta.idx > from.meta.idx) {
            this.move = "slide-left";
          } else {
            this.move = "slide-right";
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    changeHandler(value) {
      this.$router.push(value);
    },
  },
};
</script>

<style lang="stylus">
html, body, #app {
  width: 100%;
  height: 100%;
}

#app {
  display: flex;
  flex-direction: column;
}

.container {
  position: relative;
  flex: 1;
  overflow: auto;
}

.footer {
  background: #f2f2f2;
}

.cube-tab {
  i.iconfont {
    font-size: 22px;
    line-height: 26px;
  }
}

.slide-left-enter-active, .slide-left-leave-active, .slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.25s ease;
}

.slide-left-enter-active, .slide-right-enter-active {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}

.slide-left-enter, .slide-right-leave-to {
  transform: translateX(100%);
}

.slide-left-leave-to, .slide-right-enter {
  transform: translateX(-100%);
}
</style>
