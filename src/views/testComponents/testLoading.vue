<template>
  <div class="card content-box">
    <div v-loading="loadingRef" loading-tip="加载中" title="Loading组件示例" class="relative w-full">
      <div ref="wrapEl" class="relative">
        <ElDivider>组件方式</ElDivider>
        <ElButton class="my-4 mr-4" type="primary" @click="openCompFullLoading"> 全屏 Loading </ElButton>
        <ElButton class="my-4" type="primary" @click="openCompAbsolute"> 容器内 Loading </ElButton>
        <Loading
          :loading="compState.loading"
          :absolute="compState.absolute"
          :theme="compState.theme"
          :background="compState.background"
          :tip="compState.tip"
        />
        <ElDivider>函数方式</ElDivider>
        <ElButton class="my-4 mr-4" type="primary" @click="openFnFullLoading"> 全屏 Loading </ElButton>
        <ElButton class="my-4" type="primary" @click="openFnWrapLoading"> 容器内 Loading </ElButton>
        <ElDivider>指令方式</ElDivider>
        <ElButton class="my-4 mr-4" type="primary" @click="openDirectiveLoading"> 打开指令Loading </ElButton>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Loading, useLoading } from "@/components/Loading";

const wrapEl = ref<ElRef>(null);

const loadingRef = ref(false);
const compState = reactive<{
  absolute?: boolean;
  loading?: boolean;
  theme?: "dark" | "light";
  background?: string;
  tip?: string;
}>({
  absolute: false,
  loading: false,
  theme: "dark",
  background: "rgba(111,111,111,.7)",
  tip: "加载中"
});
const [openFullLoading, closeFullLoading] = useLoading({
  tip: "加载中"
});

const [openWrapLoading, closeWrapLoading] = useLoading({
  target: wrapEl,
  props: {
    tip: "加载中",
    absolute: true
  }
});

function openLoading(absolute: boolean) {
  compState.absolute = absolute;
  compState.loading = true;
  setTimeout(() => {
    compState.loading = false;
  }, 2000);
}

function openCompFullLoading() {
  openLoading(false);
}

function openCompAbsolute() {
  openLoading(true);
}

function openFnFullLoading() {
  openFullLoading();

  setTimeout(() => {
    closeFullLoading();
  }, 2000);
}

function openFnWrapLoading() {
  openWrapLoading();

  setTimeout(() => {
    closeWrapLoading();
  }, 2000);
}

function openDirectiveLoading() {
  loadingRef.value = true;
  setTimeout(() => {
    loadingRef.value = false;
  }, 2000);
}
</script>
