import autoImport from "unplugin-auto-import/vite";

export default function createAutoImport() {
  return autoImport({
    imports: ["vue", "vue-router", "pinia"],
    //配置文件位置
    dts: "./src/typings/auto-imports.d.ts"
    // dirs: ["./src/**"]
  });
}
