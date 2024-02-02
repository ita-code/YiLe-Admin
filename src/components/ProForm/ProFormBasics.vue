<template>
  <el-form class="w-full" ref="formRef" :model="formParam" :label-width="formLabelWidth" @submit.enter.prevent scroll-to-error>
    <el-row>
      <template v-for="(item, index) in formColumns" :key="index">
        <el-col v-if="item.isShow" :index="index" :span="item.span ?? 24 / row">
          <el-form-item
            :label-width="item.labelWidth ?? labelWidth"
            :class="item.isWarp ? 'label-warp' : ''"
            v-if="(item.el || item?.render) && !['slot'].includes(item.el ?? '')"
            :label="item.label"
            :rules="item?.rules ?? []"
            :prop="item.prop"
          >
            <ElementItem :column="item" :form-param="formParam" />
          </el-form-item>
          <slot v-if="item.el === 'slot'" :name="item.slot" v-bind="{ formParam }"></slot>
        </el-col>
      </template>
    </el-row>
    <div class="dialog-footer" v-if="isOperation">
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" @click="handleConfirm" :loading="formLoading"> 确认 </el-button>
    </div>
  </el-form>
</template>
<script setup lang="ts" name="SkFormBasics">
import { FormColumnProps } from "@/components/ProForm/interface";
import ElementItem from "./components/ElementItem.vue";
// import { useBaseStore } from "@/store/base";
import { useForm } from "@/components/ProForm/useForm";

interface FromProps {
  title?: string;
  isView?: boolean;
  row?: number;
  api?: (params: any) => Promise<any>;
  getTableList?: () => void;
  columns?: FormColumnProps[]; // 搜索配置列
  labelWidth?: string | number;
  defaultValue?: Recordable<string>; //默认数据
  params?: Recordable<string>; //接口所需额外参数
  isOperation?: boolean;
}
const props = withDefaults(defineProps<FromProps>(), {
  labelWidth: 0,
  isOperation: true,
  row: 1,
  columns: () => []
});
const { formLabelWidth, formColumns, init, formParam } = useForm(props.columns, props.defaultValue, props.labelWidth);

onMounted(() => {
  init();
});

const formRef = ref();
const emit = defineEmits(["confirm", "cancel", "change"]);
const formLoading = ref(false);
const handleConfirm = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      if (props.api) {
        let paramsForm = {};
        if (props?.params && Object.values(props?.params).length !== 0) {
          paramsForm = { ...formParam, ...props?.params };
        } else {
          paramsForm = formParam;
        }
        formLoading.value = true;
        const { success } = await props.api(paramsForm);
        formLoading.value = false;
        if (success) {
          props?.getTableList && props?.getTableList!();
          handleClose();
          emit("confirm");
        }
      }
    } else {
      return false;
    }
  });
};
const handleClose = () => {
  // formRef.value.resetFields()
  // formParam = {}
  emit("cancel");
};
defineExpose({
  formParam
});
</script>
