<template>
  <div class="flex-center w-full h-full">
    <img v-if="getMapValue.errorImg" :src="getMapValue.errorImg" class="mr30" :alt="getMapValue.status" />
    <div class="flex flex-col">
      <h2 class="font-size-12 m0 p0">{{ status || getMapValue.status }}</h2>
      <h4 class="mx-0 mt-8 mb-5 text-5 font-normal text-var(--el-text-color-regular)">{{ subTitle || getMapValue.subTitle }}</h4>
      <el-button
        type="primary"
        class="w-25"
        v-if="getMapValue.btnText"
        @click="
          () => {
            getMapValue.handler();
          }
        "
      >
        {{ getMapValue.btnText }}
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts" name="ErrorPage">
import { ref, computed, unref } from "vue";
import { ExceptionEnum } from "@/enums/exceptionEnum";
import type { PropType } from "vue";

import { useRouter, useRoute } from "vue-router";

const router = useRouter();
interface MapValue {
  title: string;
  subTitle: string;
  btnText?: string;
  errorImg?: string;
  handler?: any;
  status?: string;
}

const props = defineProps({
  status: {
    type: Number as PropType<number>,
    default: ExceptionEnum.PAGE_NOT_FOUND
  },
  title: {
    type: String as PropType<string>,
    default: ""
  },
  subTitle: {
    type: String as PropType<string>,
    default: ""
  }
});

const { subTitle, status } = props;

const statusMapRef = ref(new Map<string | number, MapValue>());

const { query } = useRoute();

const getStatus = computed(() => {
  const { status: routeStatus } = query;
  const { status } = props;
  return Number(routeStatus) || status;
});

const getMapValue = computed((): MapValue => {
  return unref(statusMapRef).get(unref(getStatus)) as MapValue;
});
import ERROR403 from "@/assets/images/403.png";
import ERROR404 from "@/assets/images/404.png";
import ERROR500 from "@/assets/images/500.png";

unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_ACCESS, {
  title: "403",
  status: `${ExceptionEnum.PAGE_NOT_ACCESS}`,
  subTitle: "抱歉，您无权访问该页面~🙅‍♂️🙅‍♀️",
  errorImg: ERROR403,
  btnText: "返回上一页",
  handler: () => router.back()
});

unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_FOUND, {
  title: "404",
  status: `${ExceptionEnum.PAGE_NOT_FOUND}`,
  subTitle: "抱歉，您访问的页面不存在~🤷‍♂️🤷‍♀️",
  errorImg: ERROR404,
  btnText: "返回上一页",
  handler: () => router.back()
});

unref(statusMapRef).set(ExceptionEnum.ERROR, {
  title: "500",
  status: `${ExceptionEnum.ERROR}`,
  subTitle: "抱歉，您的网络不见了~🤦‍♂️🤦‍♀️",
  errorImg: ERROR500,
  btnText: "返回上一页",
  handler: () => router.back()
});

unref(statusMapRef).set(ExceptionEnum.PAGE_NOT_DATA, {
  title: "",
  subTitle: "",
  btnText: "返回上一页",
  handler: () => router.back()
});
</script>
