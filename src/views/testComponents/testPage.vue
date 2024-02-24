<template>
  <div class="card content-box h-full w-full">
    <ProFormBasics ref="formPopupRef" title="签订采购合同" :columns="columnsForm"></ProFormBasics>
    <ElButton @click="handleAdd">给日期赋值</ElButton>
  </div>
</template>

<script setup lang="tsx" name="testPage">
import ProFormBasics from "@/components/ProForm/ProFormBasics.vue";
import { FormColumnProps } from "@/components/ProForm/interface";
const columnsForm = ref<FormColumnProps[]>([
  {
    slotName: "top",
    span: 24
  },
  {
    prop: "orderDate",
    label: "订单日期",
    rules: [{ required: true, message: "请输入订单日期", trigger: ["blur", "change"] }],
    el: "date-picker",
    props: { type: "data", valueFormat: "YYYY-MM-DD", format: "YYYY-MM-DD" }
  },
  {
    prop: "orderNumbering",
    label: "订单编号",
    rules: [{ required: true, message: "请输入订单编号", trigger: ["blur", "change"] }],
    el: "input"
  }
]);
const formPopupRef = ref<InstanceType<typeof ProFormBasics> | null>(null);
const handleAdd = () => {
  formPopupRef.value!.formParam.orderDate = "2022-02-02";
};
</script>

<style lang="scss" scoped></style>
