import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default function createSvgIcon() {
  return createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), "src/assets/svg")],
    // 指定symbolId格式
    symbolId: "[name]"
  });
}
