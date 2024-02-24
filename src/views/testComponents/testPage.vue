<template>
  <div class="card content-box h-full w-full">
    <ProFormBasics :row="2" ref="formPopupRef" title="签订采购合同" :columns="columnsForm"></ProFormBasics>
    <ElButton @click="handleAdd">给日期赋值</ElButton>
  </div>
</template>

<script setup lang="tsx" name="testPage">
import ProFormBasics from "@/components/ProForm/ProFormBasics.vue";
import { FormColumnProps } from "@/components/ProForm/interface";
const columnsForm = ref<FormColumnProps[]>([
  {
    prop: "orderNumbering",
    label: "订单编号",
    el: "text"
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
  },
  {
    prop: "orderType",
    label: "订单类型",
    rules: [{ required: true, message: "请输入订单日期", trigger: ["blur", "change"] }],
    el: "select",
    enum: [
      { label: "采购订单", value: "1" },
      { label: "销售订单", value: "2" }
    ]
  },
  {
    prop: "orderStatus",
    labelRender: () => {
      return (
        <div class="flex-center">
          订单状态
          <el-tooltip effect="dark" content="这是一个提示自定义labelRender" placement="top">
            <el-icon>
              <WarningFilled />
            </el-icon>
          </el-tooltip>
        </div>
      );
    },
    rules: [{ required: true, message: "请输入订单状态", trigger: ["blur", "change"] }],
    el: "radio-group",
    enum: [
      { label: "已签订", value: "1" },
      { label: "未签订", value: "2" }
    ]
  }
]);
const formPopupRef = ref<InstanceType<typeof ProFormBasics> | null>(null);
const handleAdd = () => {
  formPopupRef.value!.formParam.orderDate = "2022-02-02";
};
</script>

<style lang="scss" scoped></style>
