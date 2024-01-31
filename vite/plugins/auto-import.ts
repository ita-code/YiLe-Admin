import autoImport from "unplugin-auto-import/vite";

/**
 * unplugin-auto-import 用于自动导入模块，提高开发效率。
 *
 * 这个文件是一个声明全局变量的 TypeScript 文件。
 * 它使用了 declare global 来声明全局命名空间，然后导出了一系列常用的 Vue 和 Pinia 相关的函数和类型。
 * 这些导出的函数和类型可以在项目中被其他模块引入和使用。
 * 例如，可以通过 createApp 创建一个 Vue 应用，通过 defineComponent 定义一个组件，通过 ref 创建一个响应式的数据引用等等。
 *
 * 不需要重复导入模块，减少代码冗余。
 * 使用简洁，直接使用全局变量即可。
 * 提高代码可读性，清晰明了地表达使用的功能。
 * 更高的开发效率，节省时间和精力。
 * https://juejin.cn/post/7208099384070815803
 *
 * "#/*": ["src/typings/*"]  在tsconfig配置解决：类型“{}”上不存在属性
 */
export default function createAutoImport() {
  return autoImport({
    // 要转换的目标文件类型
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/ // .vue
    ],
    // 要注册的全局导入
    imports: [
      // 预设类型导入
      "vue",
      "vue-router",
      "pinia",
      // 示例类型导入
      {
        from: "vue",
        imports: ["Directive", "DirectiveBinding", "App", "CSSProperties", "ElRef", "ComponentInternalInstance"],
        type: true
      }
      // 自定义导入
      // {
      //   "[package-name]": [
      //     "[import-names]",
      //     // 别名
      //     ["[from]", "[alias]"]
      //   ]
      // }
    ],
    // 要过滤掉的导入字符串数组
    // ignore: ["useMouse", "useFetch"],
    //配置文件位置
    dts: "./src/typings/auto-imports.d.ts"
    // 目录下的模块导出自动导入设置
    // dirs: ["./src/**"]
  });
}
