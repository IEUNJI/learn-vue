<template>
  <transition>
    <div class="swiper-item" v-if="isShow" :class="{reverse}">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selected: "",
      reverse: false,
    };
  },
  computed: {
    isShow() {
      return this.selected === this.name;
    },
  },
};
</script>

<style>
.v-enter-active,
.v-leave-active {
  transition: all .5s ease;
}

.v-leave-to {
  transform: translateX(-100%);
}
.v-leave-to.reverse {
  transform: translateX(100%);
}

.v-enter {
  transform: translateX(100%);
}
.v-enter.reverse {
  transform: translateX(-100%);
}

.v-enter-active {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
