import { FormColumnProps, FormProps } from "@/components/ProForm/interface";
export const useForm = (
  columns: FormColumnProps[],
  defaultValue: Recordable<string> = {},
  labelWidth: number | string
  // api?: (params: any) => Promise<any>,
  // initParam: object = {},
  // isPageable: boolean = true,
  // dataCallBack?: (data: any) => any,
  // requestError?: (error: any) => void
) => {
  const form = reactive<FormProps>({
    formLoading: false,
    formColumns: [],
    formParam: {}
  });

  const initData = (columns: FormColumnProps[], formColumns: FormColumnProps[] = []) => {
    columns.forEach(async col => {
      formColumns.push(col);
      col.isShow = col.isShow ?? true;
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

  return {
    ...toRefs(form),
    init,
    formLabelWidth
  };
};
