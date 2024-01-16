import type { Theme } from "unocss/preset-uno";
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerCompileClass,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";
import { entriesToCss, toArray } from "@unocss/core";
import { darkTheme, lightTheme } from "./themes";

// https://unocss.nodejs.cn/config/ 配置参考页面
export default defineConfig<Theme>({
  // 生成 CSS 工具的规则。 后来的条目具有更高的优先级。
  rules: [],
  // 自定义简写以提供自动补齐建议。 如果 values 是一个数组，它将与 | 连接并用 () 封装。
  shortcuts: [
    {
      "flex-center": "flex justify-center items-center",
      "flex-col-center": "flex flex-col justify-center items-center"
    }
  ],
  // 原始 CSS 注入。
  preflights: [
    {
      getCSS: () => {
        const returnCss: any = [];
        // 明亮主题
        const lightCss = entriesToCss(Object.entries(lightTheme));
        const lightRoots = toArray([`*,::before,::after`, `::backdrop`]);
        returnCss.push(lightRoots.map(root => `${root}{${lightCss}}`).join(""));
        // 暗黑主题
        const darkCss = entriesToCss(Object.entries(darkTheme));
        const darkRoots = toArray([`html.dark,html.dark *,html.dark ::before,html.dark ::after`, `html.dark ::backdrop`]);
        returnCss.push(darkRoots.map(root => `${root}{${darkCss}}`).join(""));

        return returnCss.join("");
      }
    }
  ],
  theme: {
    colors: {
      "ui-primary": "rgb(var(--ui-primary))",
      "ui-text": "rgb(var(--ui-text))"
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: "inline-block",
        "vertical-align": "middle"
      }
    }),
    presetTypography()
  ],
  transformers: [transformerDirectives(), transformerVariantGroup(), transformerCompileClass()],
  configDeps: ["themes/index.ts"]
});
