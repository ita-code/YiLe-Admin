import components from "unplugin-vue-components/vite";

export default function createComponents() {
  return components({
    dirs: ["src/components"],
    include: [/\.vue$/, /\.vue\?vue/, /\.tsx$/],
    dts: "./src/typings/components.d.ts"
  });
}
