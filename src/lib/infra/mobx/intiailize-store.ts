import { createRootStore } from "./create-root-store";
import { registerRootStore } from "mobx-keystone";
import { IRootStore } from "./root-store.interface";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export let _store: IRootStore | null = null;

export const initializeStore = (router: AppRouterInstance) => {
  if (!_store) {
    _store = createRootStore(router);
    registerRootStore(_store);
  }

  return _store;
};
