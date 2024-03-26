<script setup lang="ts">
import ArrowUpLine from "@iconify-icons/ri/arrow-up-line";
import ArrowDownLine from "@iconify-icons/ri/arrow-down-line";
import { useRenderIcon } from "@/components/Icon/index";
const props = withDefaults(defineProps<{ total: number }>(), {
  total: 0
});
</script>

<template>
  <div class="text-3.5 flex text-[#333] dark:text-white">
    <span class="flex-center mr3">
      <component :is="useRenderIcon('al-enter_outlined svg')" class="icon" width="20px" height="20px" />
      确认
    </span>
    <span class="flex-center mr3">
      <IconifyIconOffline :icon="ArrowUpLine" class="icon" />
      <IconifyIconOffline :icon="ArrowDownLine" class="icon" />
      切换
    </span>
    <span class="flex-center mr3">
      <component :is="useRenderIcon('al-keyboard_esc svg')" class="icon" width="20px" height="20px" />
      关闭
    </span>
    <p v-if="props.total > 0" class="absolute right-5 m0">共{{ props.total }}项</p>
  </div>
</template>
<style scoped lang="scss">
.icon {
  padding: 2px;
  margin-right: 5px;
  font-size: 20px;
  box-shadow:
    inset 0 -2px #cdcde6,
    inset 0 0 1px 1px #ffffff,
    0 1px 2px 1px #1e235a66;
}
</style>
