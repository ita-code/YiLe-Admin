<template>
  <div class="card content-box h-full w-full">
    <ElInput v-model="value"></ElInput>
    <ElInput v-model="value1"></ElInput>

    <ElButton @click="value++">给日期赋值</ElButton>
    <ElButton @click="handleStop">stop</ElButton>
  </div>
</template>

<script setup lang="tsx" name="testPage">
const value = ref<number>(0);
const value1 = ref<string>("");
const stop = watchEffect(fn => {
  console.log(value1.value, "value", value.value);
  fn(() => {
    console.log("invalidate");
  });
});
// const stop = watch(value, val => {
//   console.log("value", val);
// });
const handleStop = () => {
  console.log("stop");
  stop();
};
</script>

<style lang="scss" scoped></style>
