<template>
  <div class="profile">
    <div v-if="!user.username">
      <cube-button :primary="true" @click="toLogin">登录</cube-button>
    </div>
    <div v-else>
      <img class="avatar" :src="user.url" alt="头像" @click="upFile">
      <Upload ref="upload" @change="change" />
      <!-- 动态路由 -->
      <ul class="list">
        <router-link
          tag="li"
          v-for="menu in user.menuList"
          :to="menu.path"
          :key="menu.path"
        >
          {{ menu.name }}
        </router-link>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import Upload from '@/components/Upload';
import * as types from "@/store/actions-type";

export default {
  components: {
    Upload
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapActions([types.UPLOAD]),
    toLogin() {
      this.$router.push("/login");
    },
    upFile() {
      this.$refs.upload.show();
    },
    change(fd) {
      console.log(fd);
      this[types.UPLOAD](fd).then(data => {

      });
    }
  },
};
</script>

<style lang="stylus">
.list {
  font-size: 24px;
  line-height: 24px;
}
.avatar {
  width 100px
  height 100px
}
</style>
