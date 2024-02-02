import { BreakPoint, Responsive } from "@/components/Grid/interface";
import { TableColumnCtx } from "element-plus/es/components/table/src/table-column/defaults";
import { ProTableProps } from "@/components/ProTable/index.vue";
import ProTable from "@/components/ProTable/index.vue";

export interface EnumProps {
  label?: string; // 选项框显示的文字
  value?: string | number | boolean | any[]; // 选项框值
  disabled?: boolean; // 是否禁用此选项
  tagType?: string; // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any;
}

export type TypeProps = "index" | "selection" | "radio" | "expand" | "sort";
export type ElType =
  | "text"
  | "render"
  | "upload-img"
  | "upload-imgs"
  | "radio-group"
  | "input"
  | "input-number"
  | "select"
  | "select-v2"
  | "tree-select"
  | "cascader"
  | "date-picker"
  | "time-picker"
  | "time-select"
  | "switch"
  | "slider"
  | "slot"
  | "upload-files"
  | "editor"
  | "checkbox";

export type FieldNamesProps = {
  label: string;
  value: string;
  children?: string;
};

export type RenderScope<T> = {
  row: T;
  $index: number;
  column: TableColumnCtx<T>;
  [key: string]: any;
};

export interface FormRule {
  required?: boolean;
  message?: string;
  pattern?: RegExp;
  validator?: (rule: any, value: any, callback: (error?: string) => void) => void;
  trigger?: "change" | "blur" | "manual" | ("change" | "blur")[];
}
export type FormColumnProps = {
  el?: ElType; // 当前项的类型
  prop?: string; //表单的value
  key?: string[]; //多个表单的value
  label?: string; //表单显示label
  labelWidth?: string | number; //单独设置列宽
  isWarp?: boolean; //换行
  rules?: FormRule[]; //表单验证规则
  props?: any; // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  enum?: EnumProps[] | ((params?: any) => Promise<any>); // 枚举类型（字典）
  fieldNames?: FieldNamesProps; // 指定 label && value && children 的 key 值
  span?: number; // 搜索项所占用的列数，默认为1列
  offset?: number; // 搜索字段左侧偏移列数
  defaultValue?: string | number | boolean | any[]; // 搜索项默认值
  isShow?: boolean; // 是否显示
  dicCode?: string; //字典code
  slot?: string; //插槽
  render?: (scope: ItemRenderScope) => VNode; // 自定义搜索内容渲染（tsx语法）

  // 展开收起情况
  id?: string;
  parentId?: string;
  title?: string;
  itemList?: FormColumnProps[];
  class?: string;
} & Partial<Record<BreakPoint, Responsive>>;

export type ItemRenderScope = {
  formParam?: { [key: string]: any };
  placeholder?: string;
  clearable?: boolean;
  options?: EnumProps[];
  data?: EnumProps[];
};
export type ProTableInstance = Omit<InstanceType<typeof ProTable>, keyof ComponentPublicInstance | keyof ProTableProps>;

export interface FormProps {
  formLoading: boolean;
  formColumns: FormColumnProps[];
  formParam: Recordable<string>;
}
