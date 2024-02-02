<template>
  <el-form-item
    :label-width="labelWidth ?? 80"
    :class="isWarp ? 'label-warp' : ''"
    v-if="el !== 'render'"
    :rules="rules ?? []"
    :prop="prop"
    :label="`${label ? label + (label.includes('：') ? '' : '：') : ''}`"
  >
    <ElementItem :column="props.props" :form-param="formParam" />
  </el-form-item>
  <component v-if="el === 'render' && render" :is="render"></component>
</template>

<script setup lang="ts" name="FormItem">
import { VNode } from "vue";
import ElementItem from "./ElementItem.vue";
import { ElType, FormRule, ItemRenderScope } from "@/components/ProForm/interface/index";
interface FormItemProps {
  el?: ElType; // 当前项的类型
  prop?: string; //表单的value
  label?: string; //表单显示label
  labelWidth?: string | number; //单独设置列宽
  isWarp?: boolean; //换行
  rules?: FormRule[]; //表单验证规则
  props?: any; // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  render?: (scope: ItemRenderScope) => VNode; // 自定义搜索内容渲染（tsx语法）
  formParam: { [key: string]: any };
}
const props = defineProps<FormItemProps>();
</script>
