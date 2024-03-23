<template>
  <slot v-if="column.slotName" :name="column.slotName" v-bind="{ formParam }"></slot>
  <component v-if="column.render && !column.prop" :is="column.render" v-bind="{ formParam }"></component>
  <component
    :is="`el-form-item`"
    v-if="column.el"
    :prop="column.prop"
    :label="column.label"
    :class="[column?.className && column.className]"
    :rules="column.rules"
    v-bind="$attrs"
  >
    <template #label v-if="column.labelRender">
      <component :is="column.labelRender" v-bind="{ ...column }" />
    </template>
    <component
      v-if="column?.render || (column.prop && column?.el && !['upload-imgs', 'upload-img', 'date-picker'].includes(column?.el))"
      :is="column?.render ?? `el-${column?.el}`"
      v-bind="{ ...handleProps, ...placeholder, clearable, formParam: _formParam }"
      :data="column?.el === 'tree-select' ? columnEnum : []"
      v-model="_formParam[column.prop as string]"
      :options="['cascader', 'select-v2'].includes(column?.el!) ? columnEnum : []"
    >
      <template v-if="column?.el === 'text'">
        {{ _formParam[column.prop as string] }}
      </template>
      <template v-if="column?.el === 'cascader'" #default="{ data }">
        <span>{{ data[fieldNames.label] }}</span>
      </template>
      <template v-if="column?.el === 'radio-group'">
        <component
          :is="`el-radio`"
          v-for="(col, index) in columnEnum"
          :disabled="col.disabled ?? false"
          :key="index"
          :label="col[fieldNames.value]"
        >
          {{ col[fieldNames.label] }}
        </component>
      </template>
      <template v-if="column?.el === 'select'">
        <component
          :is="`el-option`"
          v-for="(col, index) in columnEnum"
          :key="index"
          :disabled="col.disabled ?? false"
          :label="col[fieldNames.label]"
          :value="col[fieldNames.value]"
        ></component>
      </template>
    </component>
    <component
      :is="`el-date-picker`"
      v-if="column?.el === 'date-picker' && column.prop"
      v-bind="{ ...handleProps, ...placeholder, clearable, formParam: _formParam }"
      v-model="_formParam[column?.prop]"
    ></component>
  </component>
</template>

<script setup lang="ts" name="ElementItem">
import { computed, inject, ref } from "vue";
import { FormColumnProps } from "@/components/ProForm/interface";

interface ElementItem {
  column: FormColumnProps;
  formParam: { [key: string]: any };
}
const props = defineProps<ElementItem>();

const _formParam = computed(() => props.formParam);
// 判断 fieldNames 设置 label && value && children 的 key 值
const fieldNames = computed(() => {
  return {
    label: props.column.fieldNames?.label ?? "label",
    value: props.column.fieldNames?.value ?? "value",
    children: props.column.fieldNames?.children ?? "children"
  };
});

// 接收 enumMap (el 为 select-v2 需单独处理 enumData)
const enumMap = inject("enumMap", ref(new Map()));
const columnEnum = computed(() => {
  let enumData = enumMap.value.get(props.column.prop);
  if (!enumData) return [];
  if (props.column?.el === "select-v2" && props.column.fieldNames) {
    enumData = enumData.map((item: { [key: string]: any }) => {
      return { ...item, label: item[fieldNames.value.label], value: item[fieldNames.value.value] };
    });
  }
  return enumData;
});

// 处理透传的 itemProps (el 为 tree-select、cascader 的时候需要给下默认 label && value && children)
const handleProps = computed(() => {
  const label = fieldNames.value.label;
  const value = fieldNames.value.value;
  const children = fieldNames.value.children;
  const itemEl = props.column?.el;
  let itemProps = props.column?.props ?? {};
  if (itemEl === "tree-select") {
    itemProps = { ...itemProps, props: { ...itemProps.props, label, children }, nodeKey: value };
  }
  if (itemEl === "cascader") {
    itemProps = { ...itemProps, props: { ...itemProps.props, label, value, children } };
  }
  return itemProps;
});

// 处理默认 placeholder
const placeholder = computed(() => {
  const item = props.column;
  if (["datetimerange", "daterange", "monthrange"].includes(item?.props?.type) || item?.props?.isRange) {
    return { rangeSeparator: "至", startPlaceholder: "开始时间", endPlaceholder: "结束时间" };
  }
  const placeholder = item?.props?.placeholder ?? (item?.el?.includes("input") ? "请输入" : "请选择");
  return { placeholder };
});

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = computed(() => {
  const item = props.column;
  return item?.props?.clearable ?? (item?.defaultValue == null || item?.defaultValue == undefined);
});
</script>
