export default {
  install(app: App<Element>) {
    const modules = import.meta.glob("./modules/*.ts");
    for (const [key, value] of Object.entries(modules)) {
      const directiveName = key.replace("./modules/", "").split(".")[0];
      app.directive(directiveName, value.default);
    }
  }
};
