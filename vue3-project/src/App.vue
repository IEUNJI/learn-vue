<template>
  <UserRepositories :user="user" />
  <button @click="toggle">toggle</button>
</template>

<script>
import { ref } from 'vue';
import UserRepositories from './components/UserRepositories.vue';

export default {
  components: {
    UserRepositories,
  },
  setup(props) {
    const user = ref('ieunji');

    const toggle = () => {
      user.value = user.value === 'ieunji' ? 'linzijun' : 'ieunji';
    };

    return {
      user,
      toggle,
    };
  },
};
</script>