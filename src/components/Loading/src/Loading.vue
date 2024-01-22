<template>
  <section
    class="full-loading"
    :class="{ absolute, [`${theme}`]: !!theme }"
    :style="[background ? `background-color: ${background}` : '']"
    v-show="loading"
  >
    <div class="flex-col-center">
      <div class="flex-center">
        <span class="dot dot-spin"><i></i><i></i><i></i><i></i></span>
      </div>
      <div class="mt3 word-spacing-8 font-size-3" v-show="tip">{{ tip }}</div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import type { PropType } from "vue";
import { SizeEnum } from "./typing";

defineOptions({ name: "Loading" });

defineProps({
  tip: {
    type: String as PropType<string>,
    default: ""
  },
  size: {
    type: String as PropType<SizeEnum>,
    default: SizeEnum.LARGE,
    validator: (v: SizeEnum): boolean => {
      return [SizeEnum.DEFAULT, SizeEnum.SMALL, SizeEnum.LARGE].includes(v);
    }
  },
  //容器内loading,父DOM需要设置position: relative
  absolute: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  loading: {
    type: Boolean as PropType<boolean>,
    default: false
  },
  background: {
    type: String as PropType<string>
  },
  theme: {
    type: String as PropType<"dark" | "light">
  }
});
</script>
<style lang="scss" scoped>
@import "@/components/Loading/index.scss";
</style>
