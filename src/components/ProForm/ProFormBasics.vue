<template>
  <el-form class="w-full" ref="formRef" :model="formParam" :label-width="formLabelWidth" @submit.enter.prevent scroll-to-error>
    <el-row>
      <el-col
        v-for="(item, index) in columnsLists"
        :key="index"
        :index="index"
        :span="item.span ?? 24 / row"
        :offset="item.offset"
      >
        <ElementItem :form-param="formParam" :column="item" />
      </el-col>
    </el-row>
    <div class="dialog-footer">
      <el-button @click="cancel(formRef)">取消</el-button>
      <el-button type="primary" @click="confirm(formRef)" :loading="formLoading"> 确认 </el-button>
    </div>
  </el-form>
</template>
<script setup lang="ts" name="ProFormBasics">
import { FormColumnProps } from "@/components/ProForm/interface";
import ElementItem from "./components/ElementItem.vue";
import { useForm } from "@/components/ProForm/useForm";
import { ElForm } from "element-plus";

interface FromProps {
  title?: string;
  row: 1 | 2 | 3 | 4;
  columns?: FormColumnProps[]; // 配置列
  api?: (data: Recordable<string>) => Promise<any>;
  confirmCallBack?: (data: Recordable<string>) => void;
  closeCallBack?: (data: Recordable<string>) => void;
  labelWidth?: number;
  defaultValue?: Recordable<string>; //默认数据
  apiParams?: Recordable<string>;
}
const columnsLists = computed(() => {
  return formColumns.value.filter((item: FormColumnProps) => !item.isHideItem);
});
const props = withDefaults(defineProps<FromProps>(), {
  row: 1,
  columns: () => []
});
const formRef = ref<InstanceType<typeof ElForm> | null>(null);
const { formLabelWidth, formColumns, formParam, formLoading, init, confirm, cancel } = useForm(
  props.columns,
  props.defaultValue,
  props.labelWidth,
  props.confirmCallBack,
  props.closeCallBack,
  props.api,
  props.apiParams
);
onMounted(() => {
  init();
});

defineExpose({
  formParam
});
</script>
