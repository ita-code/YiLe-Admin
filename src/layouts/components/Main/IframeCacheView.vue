<template>
  <component v-for="item in hasOpenComponentsArr" :key="item.name" :is="item.name" v-show="route.path === item.path"></component>
</template>

<script setup lang="ts" name="IframeCacheView">
import { ref, onBeforeMount, computed, watchEffect } from "vue";
const componentsArr = ref<any[]>([]);
import { useRoute, RouteRecordRaw } from "vue-router";
import { useAuthStore } from "@/stores/modules/auth";
const authStore = useAuthStore();
const route = useRoute();
onBeforeMount(() => {
  // 设置iframe页的数组对象
  componentsArr.value = getComponentsArr(authStore.flatMenuListGet as []);
  // 判断当前路由是否iframe页
  isOpenIframePage();
});
watchEffect(() => {
  // console.log(routers.options.routes, "打印日志:route.path=>", route.path);
});

const hasOpenComponentsArr = computed(() => {
  return componentsArr.value.filter(item => item.hasOpen);
});
const isOpenIframePage = () => {
  const target = componentsArr.value.find(item => {
    return item.path === route.path;
  });
  if (target && !target.hasOpen) {
    target.hasOpen = true;
  }
};
const getComponentsArr = (routers: RouteRecordRaw[]) => {
  const routes = routers || [];
  const iframeArr = routes.filter((item: any) => item.isIframe);
  return iframeArr.map((item: any) => {
    const name = item.name || item.path.replace("/", "");
    return {
      ...item,
      name: name,
      path: item.path,
      hasOpen: true // 是否打开过，默认false
    };
  });
};
</script>
