<template>
  <div class="app">
    <!-- <List :arr="arr" :render="render"></List> -->
    <List :arr="arr">
      <template v-slot:title="slotProps">
        <li># {{slotProps.item}}</li>
      </template>
    </List>
  </div>
</template>

<script>
import Level from './LevelFn';
import List from './List';

export default {
  components: {
    Level,
    List
  },
  methods: {
    render(h, item) {
      return (
        <li class="abc">{item}</li>
      );
    }
  },
  data() {
    return {
      arr: [1, 2, 3]
    };
  }
};
</script>
