import { createRootStore } from "./create-root-store";
import { registerRootStore } from "mobx-keystone";
import { IRootStore } from "./root-store.interface";

export let _store: IRootStore | null = null;

export const initializeStore = () => {
  if (!_store) {
    _store = createRootStore();
    registerRootStore(_store);
  }

  return _store;
};
