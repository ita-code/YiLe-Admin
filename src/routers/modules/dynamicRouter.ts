import router from "@/routers/index";
import { LOGIN_URL, ERROR_PAGE } from "@/config";
import { RouteRecordRaw } from "vue-router";
import { ElNotification } from "element-plus";
import { useUserStore } from "@/stores/modules/user";
import { useAuthStore } from "@/stores/modules/auth";

/**
 * @description 初始化动态路由
 */
export const initDynamicRouter = async () => {
  const userStore = useUserStore();
  const authStore = useAuthStore();

  try {
    // 1.获取菜单列表 && 按钮权限列表
    await authStore.getAuthMenuList();
    await authStore.getAuthButtonList();

    // 2.判断当前用户有没有菜单权限
    if (!authStore.authMenuListGet.length) {
      ElNotification({
        title: "无权限访问",
        message: "当前账号无任何菜单权限，请联系系统管理员！",
        type: "warning",
        duration: 3000
      });
      userStore.UserLogout();
      router.replace(LOGIN_URL);
      return Promise.reject("No permission");
    }

    // 3.添加动态路由
    // 引入 views 文件夹下所有 vue 文件
    const modules: Record<string, () => Promise<Recordable>> = import.meta.glob("@/views/**/*.vue");
    authStore.flatMenuListGet.forEach(item => {
      item.children && delete item.children;
      item.component = dynamicImport(modules, item);
      if (item.meta.isFull) {
        router.addRoute(item as unknown as RouteRecordRaw);
      } else {
        router.addRoute("layout", item as unknown as RouteRecordRaw);
      }
    });
  } catch (error) {
    // 当按钮 || 菜单请求出错时，重定向到登陆页
    userStore.UserLogout();
    router.replace(LOGIN_URL);
    return Promise.reject(error);
  }
};
const IFrame = () => import("@/views/iframe/FrameBlank.vue");

function dynamicImport(dynamicViewsModules: Record<string, () => Promise<Recordable>>, menu: Menu.MenuOptions) {
  let module: (() => Promise<Recordable>) | undefined = undefined;
  if (menu?.component && typeof menu?.component == "string") {
    module = dynamicViewsModules["/src/views" + menu?.component + ".vue"];
  } else if (menu.meta.isIframe) {
    return IFrame;
  }
  if (module) return module;
  menu.prop = {
    subTitle: `在src/views/下找不到${menu.component}.vue, 请自行创建!`
  };
  return ERROR_PAGE;
}
