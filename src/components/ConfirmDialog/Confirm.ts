import { ElDialog, ElButton } from "element-plus";
import { h, ref, createApp } from "vue";

interface ConfirmType {
  title: string;
  content: string;
  cancelText?: string;
  confirmText?: string;
  type?: "primary" | "success" | "warning" | "info" | "danger";
}
export interface ConfirmResult {
  loading: boolean;
  visible: boolean;
  closeLoading: () => void;
}
export default function Confirm(
  { title, content, cancelText = "取消", confirmText = "确认", type = "primary" }: ConfirmType,
  callback: (result: ConfirmResult) => void
) {
  const visible = ref(true);
  const btnLoading = ref<boolean>(false);
  const app = createApp({
    setup() {
      const handleConfirm = () => {
        btnLoading.value = true;
        // visible.value = false;
        callback({ loading: btnLoading.value, visible: visible.value, closeLoading });
      };
      const handleCancel = () => {
        visible.value = false;
        btnLoading.value = false;
      };
      const closeLoading = () => {
        btnLoading.value = false;
      };
      return {
        visible,
        btnLoading,
        handleConfirm,
        handleCancel
      };
    },
    render() {
      return h(
        ElDialog,
        {
          width: 450,
          modelValue: visible.value,
          alignCenter: true,
          class: "el-dialog-confirm",
          "onUpdate:modelValue": (val: boolean) => {
            visible.value = val;
          }
        },
        {
          title: () => h("div", { class: "el-dialog__title" }, title),
          default: () => h("span", content),
          footer: () =>
            h("div", {}, [
              h(ElButton, { onClick: this.handleCancel }, cancelText),
              h(ElButton, { onClick: this.handleConfirm, type: type, loading: btnLoading.value }, confirmText)
            ])
        }
      );
    }
  });
  const mountNode = document.createElement("div");
  document.body.appendChild(mountNode);
  app.mount(mountNode);
}
