<script setup lang="ts">
import { SearchModal } from "./components";
const show = ref<Boolean>(false);
function handleSearch() {
  show.value = true;
}
</script>

<template>
  <div class="search-menu">
    <i :class="'iconfont icon-sousuo'" class="toolBar-icon" @click="handleSearch"></i>
    <SearchModal v-model="show" />
  </div>
</template>
<style lang="scss" scoped>
/* 自定义菜单搜索样式 */
.search-menu {
  :deep(.search-dialog) {
    @media screen and (width > 760px) and (width <= 940px) {
      .el-input__inner {
        font-size: 12px;
      }
    }

    @media screen and (width <= 470px) {
      .el-input__inner {
        font-size: 12px;
      }
    }

    .el-dialog__header {
      display: none;
    }

    .el-dialog__body {
      padding-top: 20px;
      padding-bottom: 0;
    }

    .el-input__inner {
      font-size: 1.2em;
    }

    .el-dialog__footer {
      padding-bottom: 10px;
      box-shadow:
        0 -1px 0 0 #e0e3e8,
        0 -3px 6px 0 rgb(69 98 155 / 12%);
    }
  }
}
</style>
