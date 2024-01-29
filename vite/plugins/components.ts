import components from "unplugin-vue-components/vite";

// https://juejin.cn/post/7012446423367024676
// unplugin-vue-components 则用于自动注册 Vue 组件。
// 原理是全量导入组件，但它会在编译时进行按需引入。
export default function createComponents() {
  return components({
    dirs: ["src/components"],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: "./src/typings/components.d.ts"
  });
}
