/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck
// noinspection JSUnusedGlobalSymbols
// Generated by unplugin-auto-import
/**
 * 这个文件是一个声明全局变量的 TypeScript 文件。
 * 它使用了 declare global 来声明全局命名空间，然后导出了一系列常用的 Vue 和 Pinia 相关的函数和类型。
 * 这些导出的函数和类型可以在项目中被其他模块引入和使用。
 * 例如，可以通过 createApp 创建一个 Vue 应用，通过 defineComponent 定义一个组件，通过 ref 创建一个响应式的数据引用等等。
 *
 * 不需要重复导入模块，减少代码冗余。
 * 使用简洁，直接使用全局变量即可。
 * 提高代码可读性，清晰明了地表达使用的功能。
 * 更高的开发效率，节省时间和精力。
 * https://juejin.cn/post/7208099384070815803
 */
export {}
declare global {
  const EffectScope: (typeof import("vue"))["EffectScope"];
  const acceptHMRUpdate: (typeof import("pinia"))["acceptHMRUpdate"];
  const computed: (typeof import("vue"))["computed"];
  const createApp: (typeof import("vue"))["createApp"];
  const createPinia: (typeof import("pinia"))["createPinia"];
  const customRef: (typeof import("vue"))["customRef"];
  const defineAsyncComponent: (typeof import("vue"))["defineAsyncComponent"];
  const defineComponent: (typeof import("vue"))["defineComponent"];
  const defineStore: (typeof import("pinia"))["defineStore"];
  const effectScope: (typeof import("vue"))["effectScope"];
  const getActivePinia: (typeof import("pinia"))["getActivePinia"];
  const getCurrentInstance: (typeof import("vue"))["getCurrentInstance"];
  const getCurrentScope: (typeof import("vue"))["getCurrentScope"];
  const h: (typeof import("vue"))["h"];
  const inject: (typeof import("vue"))["inject"];
  const isProxy: (typeof import("vue"))["isProxy"];
  const isReactive: (typeof import("vue"))["isReactive"];
  const isReadonly: (typeof import("vue"))["isReadonly"];
  const isRef: (typeof import("vue"))["isRef"];
  const mapActions: (typeof import("pinia"))["mapActions"];
  const mapGetters: (typeof import("pinia"))["mapGetters"];
  const mapState: (typeof import("pinia"))["mapState"];
  const mapStores: (typeof import("pinia"))["mapStores"];
  const mapWritableState: (typeof import("pinia"))["mapWritableState"];
  const markRaw: (typeof import("vue"))["markRaw"];
  const nextTick: (typeof import("vue"))["nextTick"];
  const onActivated: (typeof import("vue"))["onActivated"];
  const onBeforeMount: (typeof import("vue"))["onBeforeMount"];
  const onBeforeRouteLeave: (typeof import("vue-router"))["onBeforeRouteLeave"];
  const onBeforeRouteUpdate: (typeof import("vue-router"))["onBeforeRouteUpdate"];
  const onBeforeUnmount: (typeof import("vue"))["onBeforeUnmount"];
  const onBeforeUpdate: (typeof import("vue"))["onBeforeUpdate"];
  const onDeactivated: (typeof import("vue"))["onDeactivated"];
  const onErrorCaptured: (typeof import("vue"))["onErrorCaptured"];
  const onMounted: (typeof import("vue"))["onMounted"];
  const onRenderTracked: (typeof import("vue"))["onRenderTracked"];
  const onRenderTriggered: (typeof import("vue"))["onRenderTriggered"];
  const onScopeDispose: (typeof import("vue"))["onScopeDispose"];
  const onServerPrefetch: (typeof import("vue"))["onServerPrefetch"];
  const onUnmounted: (typeof import("vue"))["onUnmounted"];
  const onUpdated: (typeof import("vue"))["onUpdated"];
  const provide: (typeof import("vue"))["provide"];
  const reactive: (typeof import("vue"))["reactive"];
  const readonly: (typeof import("vue"))["readonly"];
  const ref: (typeof import("vue"))["ref"];
  const resolveComponent: (typeof import("vue"))["resolveComponent"];
  const setActivePinia: (typeof import("pinia"))["setActivePinia"];
  const setMapStoreSuffix: (typeof import("pinia"))["setMapStoreSuffix"];
  const shallowReactive: (typeof import("vue"))["shallowReactive"];
  const shallowReadonly: (typeof import("vue"))["shallowReadonly"];
  const shallowRef: (typeof import("vue"))["shallowRef"];
  const storeToRefs: (typeof import("pinia"))["storeToRefs"];
  const toRaw: (typeof import("vue"))["toRaw"];
  const toRef: (typeof import("vue"))["toRef"];
  const toRefs: (typeof import("vue"))["toRefs"];
  const toValue: (typeof import("vue"))["toValue"];
  const triggerRef: (typeof import("vue"))["triggerRef"];
  const unref: (typeof import("vue"))["unref"];
  const useAttrs: (typeof import("vue"))["useAttrs"];
  const useCssModule: (typeof import("vue"))["useCssModule"];
  const useCssVars: (typeof import("vue"))["useCssVars"];
  const useLink: (typeof import("vue-router"))["useLink"];
  const useRoute: (typeof import("vue-router"))["useRoute"];
  const useRouter: (typeof import("vue-router"))["useRouter"];
  const useSlots: (typeof import("vue"))["useSlots"];
  const watch: (typeof import("vue"))["watch"];
  const watchEffect: (typeof import("vue"))["watchEffect"];
  const watchPostEffect: (typeof import("vue"))["watchPostEffect"];
  const watchSyncEffect: (typeof import("vue"))["watchSyncEffect"];
}
// for type re-export
declare global {
  // @ts-ignore
  // 省去导入Vue内置类型 import type { CSSProperties } from "vue";
  export type {
    Component,
    ComponentPublicInstance,
    ComputedRef,
    ExtractDefaultPropTypes,
    ExtractPropTypes,
    ExtractPublicPropTypes,
    InjectionKey,
    PropType,
    Ref,
    VNode,
    WritableComputedRef,
    Directive,
    DirectiveBinding,
    App,
    CSSProperties
  } from "vue";
  import("vue");
}
