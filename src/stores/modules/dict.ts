// 1、并发考虑
// 2、数据刷新（方案一：在每个字典中写一个时间，对比时间是否需要重新问数据库拿）

// import Api from "@/api/common";
// import type { BaseState, CacheMap, Dict, DictItem } from "@/store/type/base";
// import { defineStore } from "pinia";

// const cacheMap: CacheMap = {};
// export const useDictStore = defineStore("base", {
//   state: (): BaseState => ({
//     dict: {}
//   }),
//   getters: {
//     getDictList(): Dict {
//       return this.dict;
//     }
//   },
//   actions: {
//     setDictData(payload: { key: string; list: DictItem[] }): void {
//       this.dict = {
//         ...this.dict,
//         [payload.key]: payload.list
//       };
//     },
//     getDicts(key: string, parentId?: string): Promise<DictItem[]> {
//       if (this.dict && (this.dict[key] as DictItem[])) {
//         return new Promise(resolve => {
//           resolve(this.dict[key] as DictItem[]);
//         });
//       } else {
//         //添加接口并发缓存处理
//         if ((cacheMap?.[key]?.length ?? 0) == 0) {
//           cacheMap[key] = [];
//           Api.getDict(key, parentId).then((res: { data: any }) => {
//             const data = res.data;
//             while (cacheMap[key].length) {
//               const list = data.map((item: any) => ({
//                 code: item.udfCode,
//                 value: item.id,
//                 label: item.udfName
//               }));
//               this.setDictData({
//                 key: key,
//                 list: list
//               });
//               const [resolve] = cacheMap[key].shift() ?? [];
//               if (resolve) {
//                 resolve(list);
//               }
//             }
//           });
//         }
//         return new Promise((resolve, reject) => {
//           cacheMap[key].push([resolve, reject]);
//         });
//       }
//     },
//     getDictsEp(key: string, parentId?: string): Promise<DictItem[]> {
//       if (this.dict && (this.dict[key] as DictItem[])) {
//         return new Promise(resolve => {
//           resolve(this.dict[key] as DictItem[]);
//         });
//       } else {
//         //添加接口并发缓存处理
//         if ((cacheMap?.[key]?.length ?? 0) == 0) {
//           cacheMap[key] = [];
//           Api.getEpDict(key, parentId).then((res: { data: any }) => {
//             const data = res.data;
//             while (cacheMap[key].length) {
//               const list = data.map((item: any) => ({
//                 code: item.udfCode,
//                 value: item.id,
//                 label: item.udfName
//               }));
//               this.setDictData({
//                 key: key,
//                 list: list
//               });
//               const [resolve] = cacheMap[key].shift() ?? [];
//               if (resolve) {
//                 resolve(list);
//               }
//             }
//           });
//         }
//         return new Promise((resolve, reject) => {
//           cacheMap[key].push([resolve, reject]);
//         });
//       }
//     }
//   }
// });
