<template>
  <ul>
    <template v-for="item in arr">
      <!-- <x-render v-if="render" :render="render" :item="item" :key="item"></x-render> -->
      <li :key="item">
        <slot name="title" :item="item">
          {{item}}
        </slot>
      </li>
    </template>
  </ul>
</template>

<script>
import XRender from './XRender';

export default {
  components: {
    'x-render': XRender
  },
  props: {
    arr: {
      type: Array
    },
    render: {
      type: Function
    }
  }
}
</script>