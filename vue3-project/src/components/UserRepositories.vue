<template>
  <input type="text" v-model="searchQuery" />
  <h3>{{ user }}</h3>
  <p v-for="item in repositories" :key="item">
    {{ item }}
  </p>
  <h4>过滤后</h4>
  <p v-for="item in repositoriesMatchingSearchQuery" :key="item">
    {{ item }}
  </p>
</template>

<script>
// reactive: 参数一般为 object，为参数增加 proxy 包裹

// ref: 将参数转换为带有 value 属性的对象，其中：
// 1. 参数为基本类型，则 value 为基本类型本身
// 2. 参数为 object，则 value 为 reactive(object)

// toRefs: 参数一般为 object，将参数的每个 key 值都转换为带有 value 属性的对象

import { reactive, ref, toRefs, toRef } from 'vue';
import useUserRepositories from '../hooks/useUserRepositories.js';
import useRepositoryNameSearch from '../hooks/useRepositoryNameSearch.js';

export default {
  props: {
    user: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const { user } = toRefs(props);

    // 获取仓库数据
    const { repositories, getUserRepositories } = useUserRepositories(user);

    // 过滤数据
    const {
      searchQuery,
      repositoriesMatchingSearchQuery,
    } = useRepositoryNameSearch(repositories);

    const obj = {
      user: { name: 'ieunji' },
    };

    console.log('raw', obj);
    console.log('reactive', reactive(obj));
    console.log('ref', ref(obj));
    console.log('toRefs', toRefs(obj));
    console.log('toRef', toRef(obj, 'user'));

    return {
      repositories,
      getUserRepositories,
      searchQuery,
      repositoriesMatchingSearchQuery,
    };
  },
};
</script>