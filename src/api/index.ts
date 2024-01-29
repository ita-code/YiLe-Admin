// 自动导入modules
const files = import.meta.glob("./modules/*.ts");
const modules = {};
for (const key in files) {
  files[key]().then(module => {
    Object.assign(modules, module);
  });
}

export default modules;
