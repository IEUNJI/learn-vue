<template>
  <div class="about">
    <div id="nav">
      <router-link to="/about/a">a</router-link> |
      <router-link to="/about/b">b</router-link>
    </div>
    <h1>This is about page</h1>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "about",
  data() {
    return {
      name: 'about'
    };
  },
};
</script>
