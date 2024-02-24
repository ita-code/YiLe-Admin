import components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://juejin.cn/post/7012446423367024676
// unplugin-vue-components 则用于自动注册 Vue 组件。
// 原理是全量导入组件，但它会在编译时进行按需引入。
export default function createComponents() {
  return components({
    dirs: ["src/components"],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: "./src/typings/components.d.ts",
    deep: false,
    // 解析的 UI 组件库，这里以 Element Plus 为例
    resolvers: [ElementPlusResolver()]
  });
}
