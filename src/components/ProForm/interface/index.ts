export interface EnumProps {
  label?: string; // 选项框显示的文字
  value?: string | number | boolean | any[]; // 选项框值
  disabled?: boolean; // 是否禁用此选项
  children?: EnumProps[]; // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any;
}

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

export interface FormRule {
  required: boolean;
  message?: string;
  pattern?: RegExp;
  validator?: (rule: any, value: any, callback: (error?: string) => void) => void;
  trigger?: "change" | "blur" | "manual" | ("change" | "blur")[];
}
export type FormColumnProps = {
  el?: ElType; // DOM
  prop?: string; // 表单value
  label?: string; // 表单label
  key?: string[]; // 多个表单的key
  labelRender?: (scope: FormColumnProps) => VNode; // 自定义 label 渲染（tsx语法）
  labelWidth?: string | number; // 单独设置列宽
  rules?: FormRule[]; // 表单验证规则
  props?: any; // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  enum?: EnumProps[] | ((params?: any) => Promise<any>); // 枚举类型（字典）
  fieldNames?: FieldNamesProps; // 指定 label && value && children 的 key 值
  span?: number; // 所占用的列数，默认为1列
  offset?: number; // 左侧偏移列数
  defaultValue?: any; // 默认值
  isHideItem?: boolean; // 是否隐藏列
  className?: string;
  slotName?: string; //插槽
  render?: (scope: FormColumnProps) => VNode; // 自定义搜索内容渲染（tsx语法）

  // dicCode?: string; //字典code

  // 展开收起情况
  id?: string;
  parentId?: string;
  title?: string;
  itemList?: FormColumnProps[];
};

export type ItemRenderScope = {
  formParam?: { [key: string]: any };
  placeholder?: string;
  clearable?: boolean;
  options?: EnumProps[];
  data?: EnumProps[];
};

export interface FormProps {
  formLoading: boolean;
  formColumns: FormColumnProps[];
  formParam: Recordable<string>;
}
