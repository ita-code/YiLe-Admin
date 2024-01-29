// 自动导入modules
const files = import.meta.glob("./modules/*.ts");
let modules = {};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
Object.entries(files).forEach(([k, v]) => {
  Object.assign(modules, v);
});
export default {
  ...modules
};
