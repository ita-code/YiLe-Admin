<script setup lang="ts">
interface Props {
  options: Array<Menu.MenuOptions | Record<string, any>>;
}

interface Emits {
  (e: "enter"): void;
}

const resultRef = ref();
const innerHeight = ref();
const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits<Emits>();
const instance = getCurrentInstance()!;

const itemStyle = computed(() => {
  return (item): CSSProperties => {
    return {
      background: item?.path === active.value ? "#000" : "red",
      color: item.path === active.value ? "#fff" : "",
      fontSize: item.path === active.value ? "16px" : "14px"
    };
  };
});

const active = defineModel({ type: String });

/** 鼠标移入 */
async function handleMouse(item) {
  active.value = item.path;
}

function handleTo() {
  emit("enter");
}

function resizeResult() {
  // el-scrollbar max-height="calc(90vh - 140px)"
  innerHeight.value = window.innerHeight - window.innerHeight / 10 - 140;
}

// useResizeObserver(resultRef, resizeResult);

function handleScroll(index: number) {
  const curInstance = instance?.proxy?.$refs[`resultItemRef${index}`];
  if (!curInstance) return 0;
  const curRef = curInstance[0] as ElRef;
  const scrollTop = curRef!.offsetTop + 128; // 128 两个result-item（56px+56px=112px）高度加上下margin（8px+8px=16px）
  return scrollTop > innerHeight.value ? scrollTop - innerHeight.value : 0;
}

onMounted(() => {
  resizeResult();
});

defineExpose({ handleScroll });
</script>

<template>
  <div ref="resultRef" class="pb3">
    <div
      v-for="(item, index) in props.options"
      :key="item.path"
      :ref="'resultItemRef' + index"
      class="flex items-center h-14 p-3.5 mt-2 cursor-pointer border-0.025 border-solid border-#ccc border-rd-1 transition='all duration-0.3s' dark:bg-[#1d1d1d]"
      :style="itemStyle(item)"
      @click="handleTo"
      @mouseenter="handleMouse(item)"
    >
      <!-- <component :is="item?.meta?.icon"></component> -->
      <span class="flex flex-1 ml-1.25">
        {{ item.meta?.title }}
      </span>
      <!-- <Kbd> √</Kbd> -->
    </div>
  </div>
</template>
