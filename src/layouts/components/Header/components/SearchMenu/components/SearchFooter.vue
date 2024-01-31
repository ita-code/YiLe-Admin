<script setup lang="ts">
const props = withDefaults(defineProps<{ total: number }>(), {
  total: 0
});
</script>

<template>
  <div class="text-3.5 flex text-[#333] dark:text-white">
    <span class="flex-center mr3">
      <Kbd> O </Kbd>
      确认
    </span>
    <span class="flex-center mr3">
      <Kbd>
        <el-icon><CaretTop /></el-icon>
      </Kbd>
      <Kbd>
        <el-icon><CaretBottom /></el-icon>
      </Kbd>
      切换
    </span>
    <span class="flex-center mr3">
      <Kbd> ESC </Kbd>
      关闭
    </span>
    <p v-if="props.total > 0" class="absolute right-5 m0">共{{ props.total }}项</p>
  </div>
</template>
