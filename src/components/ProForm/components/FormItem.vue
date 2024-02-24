<template>
  <slot v-if="item.slotName" :name="item.slotName" v-bind="{ formParam }"></slot>
  <component v-if="item.render" :is="item.render" v-bind="{ formParam }"></component>
  <el-form-item
    v-if="item.el"
    :prop="item.prop"
    :label="item.label"
    :class="[item?.className && item.className]"
    :rules="item.rules"
    v-bind="$attrs"
  >
    <template #label v-if="item.labelRender">
      <component :is="item.labelRender" v-bind="{ props }" />
    </template>
    <ElementItem :column="item" :form-param="formParam" />
  </el-form-item>
</template>

<script setup lang="ts" name="FormItem">
import ElementItem from "./ElementItem.vue";
import { FormColumnProps } from "@/components/ProForm/interface/index";
interface FormItemProps {
  formParam: Recordable<string>;
  item: FormColumnProps;
}
const props = defineProps<FormItemProps>();
</script>
