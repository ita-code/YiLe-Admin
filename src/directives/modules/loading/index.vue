<script setup lang="ts">
import { ref } from "vue";
const name = ref("张三");
const title = ref("");
const setTitle = (val: string) => {
  title.value = val;
};
// defineProps({
//   title: {
//     type: String,
//     default: '正在加载中...'
//   }
// })

defineExpose({
  name,
  setTitle,
  title
});
</script>

<template>
  <div class="loading-box">
    <div class="loading-content">
      <img src="./loading.gif" />
      <p class="desc">{{ title }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.loading-box {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .loading-content {
    text-align: center;
    ::v-deep() {
      img {
        width: 35px !important;
        height: 35px;
      }
    }
    .desc {
      line-height: 20px;
      font-size: 12px;
      color: #fff;
      position: relative;
    }
  }
}
</style>
