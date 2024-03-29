import { defineStore } from "pinia";
import { UserState } from "@/stores/interface";
import { Login } from "@/api/interface/index";

import piniaPersistConfig from "@/stores/helper/persist";

import { loginApi, logoutApi } from "@/api/modules/login";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { useTabsStore } from "./tabs";
import { useKeepAliveStore } from "./keepAlive";

import md5 from "md5";
import { PiniaStoreId } from "@/enums/StoreEnum";
const useUserDefineStore = defineStore({
  id: PiniaStoreId.User,
  state: (): UserState => ({
    token: "",
    userInfo: { name: "admin" }
  }),
  getters: {},
  actions: {
    // Set Token
    setToken(token: string) {
      this.token = token;
    },
    // Set setUserInfo
    setUserInfo(userInfo: UserState["userInfo"]) {
      this.userInfo = userInfo;
    },
    // 用户登录
    async UserLogin(loginForm: Login.ReqLoginForm) {
      // 执行登录接口
      const { data } = await loginApi({ ...loginForm, password: md5(loginForm.password) });
      this.setToken(data.access_token);
      // 添加动态路由
      await initDynamicRouter();
    },
    // 用户退出 && 清空 tabs、keepAlive 数据
    async UserLogout() {
      await logoutApi();
      const tabsStore = useTabsStore();
      const keepAliveStore = useKeepAliveStore();
      tabsStore.setTabs([]);
      keepAliveStore.setKeepAliveName([]);
      this.setToken("");
    }
  },
  persist: piniaPersistConfig(PiniaStoreId.User)
});
import pinia from "@/stores";
export function useUserStore() {
  return useUserDefineStore(pinia);
}
