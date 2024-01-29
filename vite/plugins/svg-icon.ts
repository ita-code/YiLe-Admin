import { resolve } from "path";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

export default function createSvgIcon() {
  return createSvgIconsPlugin({
    iconDirs: [resolve(process.cwd(), "src/assets/icons")],
    symbolId: "icon-[dir]-[name]"
  });
}
