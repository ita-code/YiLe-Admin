<script setup lang="ts">
import { useRouter } from "vue-router";
import SearchResult from "./SearchResult.vue";
import SearchFooter from "./SearchFooter.vue";
import { useDebounceFn, onKeyStroke } from "@vueuse/core";
import { useAuthStore } from "@/stores/modules/auth";

const router = useRouter();

const keyword = ref("");
const scrollbarRef = ref();
const resultRef = ref();
const activePath = ref("");
const inputRef = ref<HTMLInputElement | null>(null);
const resultOptions = ref<Menu.MenuOptions[] | Record<string, any>[]>([]);
const handleSearch = useDebounceFn(search, 300);

const show = defineModel({ type: Boolean });

/** 查询 */
const authStore = useAuthStore();
function search() {
  const flatMenusData = authStore.flatMenuListGet;
  resultOptions.value = flatMenusData.filter(menu =>
    keyword.value
      ? menu.meta?.title.toLocaleLowerCase().includes(keyword.value.toLocaleLowerCase().trim())
      : // ||
        // (locale.value === "zh" &&
        //   !isAllEmpty(match(menu.meta?.title.toLocaleLowerCase(), keyword.value.toLocaleLowerCase().trim())))
        false
  );
  if (resultOptions.value?.length > 0) {
    activePath.value = resultOptions.value[0].path;
  } else {
    activePath.value = "";
  }
}

function handleClose() {
  show.value = false;
  /** 延时处理防止用户看到某些操作 */
  setTimeout(() => {
    resultOptions.value = [];
    keyword.value = "";
  }, 200);
}

function scrollTo(index) {
  const scrollTop = resultRef.value.handleScroll(index);
  scrollbarRef.value.setScrollTop(scrollTop);
}

/** key up */
function handleUp() {
  const { length } = resultOptions.value;
  if (length === 0) return;
  const index = resultOptions.value.findIndex(item => item.path === activePath.value);
  if (index === 0) {
    activePath.value = resultOptions.value[length - 1].path;
    scrollTo(resultOptions.value.length - 1);
  } else {
    activePath.value = resultOptions.value[index - 1].path;
    scrollTo(index - 1);
  }
}

/** key down */
function handleDown() {
  const { length } = resultOptions.value;
  if (length === 0) return;
  const index = resultOptions.value.findIndex(item => item.path === activePath.value);
  if (index + 1 === length) {
    activePath.value = resultOptions.value[0].path;
  } else {
    activePath.value = resultOptions.value[index + 1].path;
  }
  scrollTo(index + 1);
}

/** key enter */
function handleEnter() {
  const { length } = resultOptions.value;
  if (length === 0 || activePath.value === "") return;
  router.push(activePath.value);
  handleClose();

  // 点击菜单跳转
  // const handleClickMenu = (menuItem: Menu.MenuOptions | Record<string, any>) => {
  //   searchMenu.value = "";
  //   if (menuItem.meta.isLink) window.open(menuItem.meta.isLink, "_blank");
  //   else router.push(menuItem.path);
  //   closeSearch();
  // };
}

onKeyStroke("Enter", handleEnter);
onKeyStroke("ArrowUp", handleUp);
onKeyStroke("ArrowDown", handleDown);
</script>

<template>
  <el-dialog
    v-model="show"
    top="5vh"
    :show-close="false"
    :width="'40vw'"
    :before-close="handleClose"
    :style="{
      borderRadius: '6px'
    }"
    @opened="inputRef!.focus()"
    @closed="inputRef!.blur()"
    class="search-dialog"
  >
    <el-input ref="inputRef" v-model="keyword" size="large" clearable placeholder="搜索菜单" @input="handleSearch">
      <template #prefix>
        <el-icon class="text-primary w-[24px] h-[24px]"><Search /></el-icon>
      </template>
    </el-input>
    <div class="search-result-container">
      <el-scrollbar ref="scrollbarRef" max-height="calc(90vh - 140px)">
        <el-empty v-if="resultOptions.length === 0" description="暂无搜索结果" />
        <SearchResult v-else ref="resultRef" v-model="activePath" :options="resultOptions" @click="handleEnter" />
      </el-scrollbar>
    </div>
    <template #footer>
      <SearchFooter :total="resultOptions.length" />
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped></style>
