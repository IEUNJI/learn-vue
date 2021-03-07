<template>
  <Swiper v-model="selected" autoplay>
    <SwiperItem name="box1">
      <div class="content" style="background: red">内容1</div>
    </SwiperItem>
    <SwiperItem name="box2">
      <div class="content" style="background: yellow">内容2</div>
    </SwiperItem>
    <SwiperItem name="box3">
      <div class="content" style="background: green">内容3</div>
    </SwiperItem>
  </Swiper>
</template>

<script>
import Swiper from "./components/Swiper";
import SwiperItem from "./components/SwiperItem";

export default {
  components: {
    Swiper,
    SwiperItem,
  },
  data() {
    return {
      selected: "box2",
    };
  },
  mounted() {
    // setTimeout(() => {
    //   this.selected = "box3";
    // }, 3000);
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
.content {
  /* width: 300px; */
  width: 100%;
  height: 150px;
}
</style>
