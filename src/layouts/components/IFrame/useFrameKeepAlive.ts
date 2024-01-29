import { useTabsStore } from "@/stores/modules/tabs";

import { useAuthStore } from "@/stores/modules/auth";

import { uniqBy } from "lodash-es";

export function useFrameKeepAlive() {
  const router = useRouter();
  const { currentRoute } = router;
  const tabStore = useTabsStore();
  const authStore = useAuthStore();
  const getFramePages = computed(() => {
    return getAllFramePages(toRaw(authStore.authMenuListGet) as unknown as Menu.MenuOptions[]) || [];
  });

  const getOpenTabList = computed((): string[] => {
    return tabStore.tabsMenuList.reduce((prev: string[], next) => {
      if (next && Reflect.has(next, "frameSrc")) {
        prev.push(next.name as string);
      }
      return prev;
    }, []);
  });

  function getAllFramePages(routes: Menu.MenuOptions[]): Menu.MenuOptions[] {
    let res: Menu.MenuOptions[] = [];
    for (const route of routes) {
      const { meta: { isIframe: frameSrc = "" } = {}, children } = route;
      if (frameSrc) {
        res.push(route as any);
      }
      if (children && children.length) {
        res.push(...getAllFramePages(children));
      }
    }
    res = uniqBy(res, "name");
    return res;
  }

  function showIframe(item: Menu.MenuOptions) {
    return item.name === unref(currentRoute).name;
  }

  function hasRenderFrame(name: string) {
    return unref(getOpenTabList).includes(name) || router.currentRoute.value.name === name;
  }

  return { hasRenderFrame, getFramePages, showIframe, getAllFramePages };
}
