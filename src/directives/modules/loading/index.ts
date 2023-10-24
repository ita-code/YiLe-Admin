import { createApp, type DirectiveBinding } from "vue";
import Loading from "./index.vue";
const relative = "relative";
const loadingDirective = {
  /* 节点都挂载完成后调用 */
  mounted(el: any, binding: DirectiveBinding) {
    /* 
       value 控制开启和关闭loding
       arg loading显示的文字
    */
    const { value, arg } = binding;
    console.log(value, arg);

    /* 创建loading实例,并挂载 */
    const app = createApp(Loading);
    const instance = app.mount(document.createElement("div"));
    /* 为了让elAppend获取到创建的div元素 */
    el.instance = instance;

    /* 添加title */
    if (arg) {
      instance.setTitle(arg);
    }
    /* 将loading实例挂载到指令元素中 */
    if (value) {
      handleAppend(el);
    }
  },
  /* 更新后调用 */
  updated(el: any, binding: DirectiveBinding) {
    const { value, oldValue, arg } = binding;
    if (value !== oldValue) {
      /* 更新标题 */
      if (arg) {
        el.instance.setTitle(arg);
      }
      value ? handleAppend(el) : handleRemove(el);
    }
  }
};
/* 将loading添加到指令所在DOM */
const handleAppend = (el: any) => {
  const style = getComputedStyle(el);
  if (!["absolute", "relative", "fixed"].includes(style.position)) {
    addClass(el, relative as any);
  }

  el.appendChild(el.instance.$el);
};

/* 将loading在DOM中移除 */
const handleRemove = (el: any) => {
  removeClass(el, relative as any);
  el.removeChild(el.instance.$el);
};

const addClass = (el: any, className: string) => {
  if (!el.classList.contains(className)) {
    el.classList.add(className);
  }
};
const removeClass = (el: any, className: string) => {
  el.classList.remove(className);
};

export default loadingDirective;
