import { ElDialog, ElButton } from "element-plus";
import { h, ref, createApp } from "vue";
interface ConfirmType {
  title: string;
  content: string;
  cancelText: string;
  confirmText: string;
  type: "primary" | "success" | "warning" | "info" | "error";
}
export default function SkConfirm({ title, content, cancelText = "取消", confirmText = "确定", type = "primary" }: ConfirmType) {
  return new Promise(resolve => {
    const visible = ref(true);
    const app = createApp({
      setup() {
        const handleConfirm = () => {
          visible.value = false;
          resolve(true);
        };
        const handleCancel = () => {
          visible.value = false;
          resolve(false);
        };
        return {
          visible,
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
            class: "el-dialog-sk-confirm",
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
                h(ElButton, { onClick: this.handleConfirm, type: type }, confirmText)
              ])
          }
        );
      }
    });
    const mountNode = document.createElement("div");
    document.body.appendChild(mountNode);
    app.mount(mountNode);
  });
}
