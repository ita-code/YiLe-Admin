<template>
  <div v-if="showFrame">
    <template v-for="frame in getFramePages" :key="frame.path">
      <FramePage
        v-if="frame.meta?.isIframe && hasRenderFrame(frame.name)"
        v-show="showIframe(frame)"
        :frame-src="frame.meta?.isIframe"
      />
    </template>
  </div>
</template>
<script lang="ts" setup>
import FramePage from "@/views/iframe/index.vue";

import { useFrameKeepAlive } from "./useFrameKeepAlive";

defineOptions({ name: "FrameLayout" });

const { getFramePages, hasRenderFrame, showIframe } = useFrameKeepAlive();

const showFrame = computed(() => unref(getFramePages).length > 0);
</script>
