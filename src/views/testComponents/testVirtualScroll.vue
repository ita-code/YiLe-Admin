<template>
  <div class="card content-box">
    <el-divider>基础滚动示例</el-divider>
    <div class="virtual-scroll-demo-wrap">
      <VirtualScroll :item-height="41" :items="data" :height="300" :width="300">
        <template #default="{ item }">
          <div class="virtual-scroll-demo__item">
            {{ item.title }}
          </div>
        </template>
      </VirtualScroll>
    </div>

    <ElDivider>即使不可见，也预先加载50条数据，防止空白</ElDivider>
    <div class="virtual-scroll-demo-wrap">
      <VirtualScroll :item-height="41" :items="data" :height="300" :width="300" :bench="50">
        <template #default="{ item }">
          <div class="virtual-scroll-demo__item">{{ item.title }}</div>
        </template>
      </VirtualScroll>
    </div>
  </div>
</template>

<script setup lang="ts" name="testVirtualScroll">
import VirtualScroll from "@/components/VirtualScroll/index.vue";
const data = (() => {
  const arr: any[] = [];
  for (let index = 1; index < 20000; index++) {
    arr.push({
      title: "列表项" + index
    });
  }
  return arr;
})();
</script>
<style scoped lang="scss">
.virtual-scroll-demo {
  &-wrap {
    display: flex;
    justify-content: center;
    margin: 0 30%;
  }
  &__item {
    height: 40px;
    padding: 0 20px;
    line-height: 40px;
  }
}
</style>
