<template>
  <slot v-if="el === 'slot'" :name="slotName" v-bind="{ formParam }"></slot>
  <component v-else-if="el === 'render'" :is="render"></component>
  <el-form-item v-else :prop="prop" :label="label" :class="[className]" :rules="rules" v-bind="$attrs">
    <!-- 自定义label -->
    <template #label v-if="labelRender">
      <render-comp :render="labelRender" :item="props" />
    </template>
    <ElementItem :column="props.props" :form-param="formParam" />
  </el-form-item>
</template>

<script setup lang="ts" name="FormItem">
import ElementItem from "./ElementItem.vue";
import { FormColumnProps } from "@/components/ProForm/interface/index";
interface FormItemProps {
  formParam: Recordable<string>;
}
const props = defineProps<FormColumnProps & FormItemProps>();
</script>
