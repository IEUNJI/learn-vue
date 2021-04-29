<template>
  <div class="counter">
    <p>number: {{number}}</p>
    <p>doubleNumber: {{doubleNumber}}</p>
    <input ref="input" type="text">
  </div>
</template>

<script>
import { reactive, computed, onMounted, onUnmounted, toRefs, ref, watch } from 'vue';

const useCounter = () => {
  const data = reactive({
    number: 1,
    doubleNumber: computed(() => data.number * 2)
  });

  let timer;

  onMounted(() => {
    timer = setInterval(() => {
      data.number += 1;
    }, 1000);
  });

  onUnmounted(() => {
    clearInterval(timer);
  });

  return toRefs(data);
};

export default {
  setup() {
    const { number, doubleNumber } = useCounter();
    
    const input = ref(null);

    watch(number, (val, oldVal) => {
      console.log(`number change ${oldVal} => ${val}`);
    });

    return {
      number,
      doubleNumber,
      input
    };
  }
};
</script>
