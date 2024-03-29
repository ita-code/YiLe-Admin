import { RouteRecordRaw } from "vue-router";
import { HOME_URL, LOGIN_URL, ERROR_PAGE } from "@/config";

/**
 * staticRouter (静态路由)
 */
export const staticRouter: RouteRecordRaw[] = [
  {
    path: "/",
    redirect: HOME_URL
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录"
    }
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layouts/index.vue"),
    // component: () => import("@/layouts/indexAsync.vue"),
    redirect: HOME_URL,
    children: []
  }
];

/**
 * errorRouter (错误页面路由)
 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: ERROR_PAGE,
    meta: {
      title: "403页面"
    },
    props: {
      status: 403
    }
  },
  {
    path: "/404",
    name: "404",
    component: ERROR_PAGE,
    meta: {
      title: "404页面"
    },
    props: {
      status: 404
    }
  },
  {
    path: "/500",
    name: "500",
    component: ERROR_PAGE,
    meta: {
      title: "500页面"
    },
    props: {
      status: 500
    }
  },
  // Resolve refresh page, route warnings
  {
    path: "/:pathMatch(.*)*",
    component: ERROR_PAGE
  }
];

/**
 * testComponentRouter (测试组件路由)
 */
export const testComponentRouter = [
  {
    path: "/test",
    name: "test",
    redirect: "/test/virtualScroll",
    meta: {
      icon: "Briefcase",
      title: "组件",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    },
    children: [
      {
        path: "/test/virtualScroll",
        name: "virtualScroll",
        component: "/testComponents/testVirtualScroll",
        meta: {
          icon: "Menu",
          title: "虚拟列表",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      },
      {
        path: "/test/loading",
        name: "loading",
        component: "/testComponents/testLoading",
        meta: {
          icon: "Menu",
          title: "loading",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      },
      {
        path: "/test3/index",
        name: "test3",
        component: "/testComponents/testPage",
        meta: {
          icon: "Menu",
          title: "测试页面",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      },
      {
        path: "/test4/index",
        name: "test4",
        component: "/testComponents/testIcon",
        meta: {
          icon: "Menu",
          title: "测试Icon",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      }
    ]
  }
];

/**
 * docFrameRouter (文档内嵌路由)
 * @description: iframe嵌入文档
 * @param {string} isIframe - iframe地址
 */
export const docFrameRouter = [
  // {
  //   path: "/test1/index",
  //   name: "test1",
  //   meta: {
  //     icon: "HomeFilled",
  //     title: "缓存IFrom1",
  //     isLink: "",
  //     isHide: false,
  //     isFull: false,
  //     isAffix: false,
  //     isKeepAlive: true,
  //     isIframe: "https://cn.bing.com/"
  //   }
  // },
  // {
  //   path: "/test2/index",
  //   name: "test2",
  //   meta: {
  //     icon: "HomeFilled",
  //     title: "缓存IFrom2",
  //     isLink: "",
  //     isHide: false,
  //     isFull: false,
  //     isAffix: false,
  //     isKeepAlive: true,
  //     isIframe: "http://localhost:1125"
  //   }
  // },
];
