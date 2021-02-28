<template>
  <div id="app">
    <Menu :data="data" />
  </div>
</template>

<script>
import Menu from "./menu";

export default {
  components: {
    Menu,
  },
  data() {
    return {
      data: [
        {
          name: "导航1",
          id: "1",
          children: [
            {
              name: "导航1-1",
              id: "1-1",
              children: [
                {
                  name: "选项1-1-1",
                  id: "1-1-1",
                  children: [],
                },
                {
                  name: "选项1-1-2",
                  id: "1-1-2",
                  children: [],
                },
              ],
            },
            {
              name: "选项1-2",
              id: "1-2",
              children: [],
            },
            {
              name: "选项1-3",
              id: "1-3",
              children: [],
            },
          ],
        },
        {
          name: "导航2",
          id: "2",
          children: [],
        },
        {
          name: "导航3",
          id: "3",
          children: [],
        },
      ],
    };
  },
};
</script>
