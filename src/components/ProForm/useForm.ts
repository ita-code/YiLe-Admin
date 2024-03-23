import { FormColumnProps, FormProps } from "@/components/ProForm/interface";
import { ElForm } from "element-plus";
export const useForm = (
  columns: FormColumnProps[],
  defaultValue: Recordable<string> = {},
  labelWidth: number = 0,
  confirmCallBack?: (data: Recordable<string>) => void,
  closeCallBack?: (data: Recordable<string>) => void,
  api?: (params: any) => Promise<any>,
  apiParams: Recordable<string> = {}
) => {
  const form = reactive<FormProps>({
    formLoading: false,
    formColumns: [],
    formParam: {}
  });

  const initData = (columns: FormColumnProps[], formColumns: FormColumnProps[] = []) => {
    columns.forEach(async col => {
      formColumns.push(col);
      col.isHideItem = col.isHideItem ?? false;
      if (!col?.prop) return;
      col?.key && mapObj(form.formParam, col.key);
      form.formParam[col?.prop] = "";
      setEnumMap(col);
    });
    return formColumns;
  };
  const enumMap = ref(new Map<string, Recordable<string>[]>());
  provide("enumMap", enumMap);
  const setEnumMap = async (col: FormColumnProps) => {
    // if (col.dicCode) {  字典加载
    //   const list = await useBaseStore().getDicts(col.dicCode);
    //   enumMap.value.set(col.prop!, list);
    //   return;
    // }
    if (!col.enum) return;
    if (typeof col.enum !== "function") return enumMap.value.set(col.prop!, col.enum!);
    const { data } = await col.enum();
    enumMap.value.set(col.prop!, data);
  };
  const mapObj = (obj: { [key: string]: any }, key: string[]) => {
    key.forEach((e: string) => (obj[e] = ""));
  };
  const updateValue = (data?: Recordable<string>) => {
    const dataValue = data ?? defaultValue;
    if (dataValue && Object.values(dataValue).length !== 0) {
      for (const key in form.formParam) {
        form.formParam[key] = dataValue[key] ?? "";
      }
    }
  };
  const formLabelWidth = computed(() => {
    return labelWidth !== 0
      ? labelWidth
      : (Math.max(0, ...columns.map(item => (item.label ? item.label.length : 0))) + 1) * 17 + 10;
  });
  const init = () => {
    form.formColumns = initData(columns);
    updateValue();
  };
  //回调方法取代emit
  // interface Emits {
  //   (e: "confirm"): void;
  //   (e: "cancel"): void;
  // }
  // const emit = defineEmits<Emits>();
  const confirm = (formRef: InstanceType<typeof ElForm> | null) => {
    formRef!.validate(async (valid: boolean) => {
      if (valid) {
        const paramsForm = { ...form.formParam, ...apiParams };
        if (api) {
          form.formLoading = true;
          const { success } = await api(paramsForm);
          form.formLoading = false;
          if (success) {
            cancel(formRef);
          }
        }
        confirmCallBack && confirmCallBack(form.formParam);
      } else {
        return false;
      }
    });
  };
  const cancel = (formRef: InstanceType<typeof ElForm> | null) => {
    formRef!.resetFields();
    form.formParam = {};
    closeCallBack && closeCallBack(form.formParam);
  };
  return {
    ...toRefs(form),
    formLabelWidth,
    init,
    confirm,
    cancel
  };
};
