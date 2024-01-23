<template>
  <div class="card content-box h-full w-full" v-loading="loading" :style="getWrapStyle">
    <iframe :src="frameSrc" ref="frameRef" @load="hideLoading" frameborder="0" class="full-iframe" :style="getWrapStyle"></iframe>
  </div>
</template>
<script lang="ts" setup>
import type { CSSProperties } from "vue";
import { ref, unref, onMounted, onUnmounted, computed } from "vue";

const emit = defineEmits(["message"]);
defineProps({
  frameSrc: {
    type: String,
    default: ""
  }
});

const heightRef = ref(window.innerHeight);
const getWrapStyle = computed((): CSSProperties => {
  return {
    height: `${unref(heightRef)}px`
  };
});
const topRef = ref(50);
function calcHeight() {
  const iframe = unref(frameRef);
  if (!iframe) {
    return;
  }
  const top = 95 + 50;
  topRef.value = top;
  heightRef.value = window.innerHeight - top;
  const clientHeight = document.documentElement.clientHeight - top;
  iframe.style.height = `${clientHeight}px`;
}

const loading = ref(true);
const frameRef = ref<HTMLFrameElement>();

function hideLoading() {
  loading.value = false;
  calcHeight();
}

const messageHandler = (e: MessageEvent) => {
  emit("message", e.data);
};

const postMessage = (message: any, tragetOrigin: string, transfer?: Transferable[]) => {
  const iframe = unref(frameRef);
  if (!iframe) return;
  iframe.contentWindow?.postMessage(message, tragetOrigin, transfer);
};

const reload = () => {
  loading.value = true;
  const iframe = frameRef.value;
  if (!iframe) return;
  iframe.contentWindow?.location.reload();
  loading.value = false;
};

onMounted(() => {
  window.addEventListener("message", messageHandler);
});

onUnmounted(() => {
  window.removeEventListener("message", messageHandler);
});

defineExpose({ postMessage, reload });
</script>
