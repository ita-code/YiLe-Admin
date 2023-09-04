import { App, defineAsyncComponent } from "vue";

export default {
  install: function (app: App<Element>) {
    const iframePageList = import.meta.glob("./*.vue");
    for (let [key, component] of Object.entries(iframePageList)) {
      const componentName = key.replace("./", "").split(".")[0];
      // 通过 defineAsyncComponent 异步导入指定路径下的组件
      app.component(
        componentName,
        // component
        defineAsyncComponent(() => {
          return component().then((m: any) => {
            // 进行类型断言，将 component 类型明确为组件类型
            return m.default || m;
          });
        })
      );
    }
  }
};
