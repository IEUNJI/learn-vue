<template>
  <div class="home">
    <HomeHeader :categories="categories" @change="change"></HomeHeader>
    <div class="home-slide">
      <cube-slide :data="slides" />
    </div>
    <div class="home-view-wrapper">
      <cube-recycle-list
        class="list"
        :size="size"
        :on-fetch="onFetch"
        :offset="offset"
        ref="list"
      >
        <template slot="item" slot-scope="{ data }">
          <div :id="data.id" class="item">
            <h2>{{ data.title }}</h2>
            <img :src="data.pic" />
            <p>{{ data.price | addCurrency('￥') }}</p>
          </div>
        </template>
      </cube-recycle-list>
    </div>
  </div>
</template>

<script>
import HomeHeader from "./HomeHeader";
import { fetchLessonList } from "@/api/home";

import { createNamespacedHelpers } from "vuex";
const { mapActions, mapState, mapMutations } = createNamespacedHelpers("home");

import * as types from "@/store/actions-type";

export default {
  components: {
    HomeHeader,
  },
  data() {
    return {
      size: 5,
      offset: 5,
      offsetIndex: 0,
      hasMore: true,
    };
  },
  computed: {
    ...mapState(["categories", "slides", "currentLesson"]),
  },
  methods: {
    ...mapActions([types.SET_CATEGORIES, types.SET_SLIDES]),
    ...mapMutations([types.SET_CURRENT_LESSON]),
    change(value) {
      this[types.SET_CURRENT_LESSON](value);
      this.hasMore = true;
      this.offsetIndex = 0;
      this.$refs.list.reset();
    },
    async onFetch() {
      if (this.hasMore) {
        const { result, hasMore } = await fetchLessonList({
          id: this.currentLesson,
          size: this.size,
          offset: this.offsetIndex,
        });
        this.hasMore = hasMore;
        this.offsetIndex += result.length;
        return result;
      } else {
        return false;
      }
    },
  },
  mounted() {
    this[types.SET_CATEGORIES]();
    this[types.SET_SLIDES]();
  },
};
</script>

<style lang="stylus">
img {
  width: 100%;
  max-width: 100%;
}

.home {
  &-slide {
    width: 100%;
    height: 150px;
  }

  &-view-wrapper {
    padding: 10px 20px;
    height: calc(100vh - 261px);

    .item {
      border: 1px solid #ccc;
      border-radius: 10px;
      margin-bottom: 10px;
      height: 250px;
      display: flex;
      flex-direction: column;
      justify-content: center;

      img {
        width: 100%;
      }

      h2, p {
        text-align: center;
        line-height: 30px;
      }
    }
  }
}
</style>
