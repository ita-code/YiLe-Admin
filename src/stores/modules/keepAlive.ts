import { defineStore } from "pinia";
import { KeepAliveState } from "@/stores/interface";
import { PiniaStoreId } from "@/enums/StoreEnum";
const useKeepAliveDefineStores = defineStore({
  id: PiniaStoreId.KeepAlive,
  state: (): KeepAliveState => ({
    keepAliveName: []
  }),
  actions: {
    // Add KeepAliveName
    async addKeepAliveName(name: string) {
      !this.keepAliveName.includes(name) && this.keepAliveName.push(name);
    },
    // Remove KeepAliveName
    async removeKeepAliveName(name: string) {
      this.keepAliveName = this.keepAliveName.filter(item => item !== name);
    },
    // Set KeepAliveName
    async setKeepAliveName(keepAliveName: string[] = []) {
      this.keepAliveName = keepAliveName;
    }
  }
});

import pinia from "@/stores";
export function useKeepAliveStore() {
  return useKeepAliveDefineStores(pinia);
}
