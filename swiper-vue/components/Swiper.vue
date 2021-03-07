<template>
  <div
    class="swiper"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
    @touchstart="touchstart"
    @touchmove="touchmove"
    @touchend="touchend"
  >
    <div class="viewport">
      <slot></slot>
    </div>
    <div class="dots">
      <span
        v-for="(item, index) in len"
        :key="index"
        :class="{ active: active === index }"
        @click="select(index)"
      >
        {{ item }}
      </span>
    </div>
    <div class="btn-list">
      <button @click="select(active - 1)">👈</button>
      <button @click="select(active + 1)">👉</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: "",
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      currentSelected: "",
      len: 0,
    };
  },
  watch: {
    value() {
      this.showChild();
    },
  },
  computed: {
    active() {
      return this.names.indexOf(this.currentSelected);
    },
  },
  methods: {
    touchstart(e) {
      this.mouseenter();
      this.startX = e.touches[0].clientX;
    },
    touchmove() {
    },
    touchend(e) {
      const endX = e.changedTouches[0].clientX;
      const distance = endX - this.startX;
      if (distance < 0) {
        this.select(this.active + 1);
      } else {
        this.select(this.active - 1);
      }
      this.mouseleave();
    },
    mouseenter() {
      clearInterval(this.timer);
      this.timer = null;
    },
    mouseleave() {
      if (this.timer) return;
      this.run();
    },
    showChild() {
      this.currentSelected = this.value || this.$children[0].name;
      this.$children.forEach((vm) => {
        this.$nextTick(() => {
          vm.selected = this.currentSelected;
        });

        const reverse = this.prevPosition > this.active ? true : false;
        vm.reverse = reverse;

        if (this.timer) {
          if (this.prevPosition === 0 && this.active === this.len - 1) {
            vm.reverse = true;
          }
          if (this.prevPosition === this.len - 1 && this.active === 0) {
            vm.reverse = false;
          }
        }
      });
    },
    run() {
      if (!this.autoplay) return;
      this.timer = setInterval(() => {
        console.log("timer");
        const index = this.active;
        let newIndex = index + 1;
        this.select(newIndex);
      }, 3000);
    },

    select(newIndex) {
      this.prevPosition = this.active;
      if (newIndex === this.names.length) {
        newIndex = 0;
      }
      if (newIndex === -1) {
        newIndex = this.names.length - 1;
      }
      this.$emit("input", this.names[newIndex]);
    },
  },
  mounted() {
    this.names = this.$children.map((vm) => vm.name);
    this.len = this.names.length;
    this.showChild();
    this.run();

    this.prevPosition = this.active;
  },
  beforeDestroy() {
    clearInterval(this.timer);
  },
};
</script>

<style>
.swiper {
  /* width: 300px; */
  margin: 0 auto;
  border: 10px solid purple;
}

.viewport {
  position: relative;
  overflow: hidden;
  height: 150px;
}

.dots {
  display: flex;
  justify-content: center;
}

.dots span {
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  border: 1px solid red;
  margin: 0 10px;
  cursor: pointer;
}

.active {
  background: red;
  color: white;
}
</style>
