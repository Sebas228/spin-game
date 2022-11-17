import { writable } from 'svelte/store';

export interface GlobalStoreI {
  activeGroup: string | null;
  isSelecting: boolean;
};

const DefaultStore: GlobalStoreI = {
  activeGroup: null,
  isSelecting: false,
};

export const globalStore = writable<GlobalStoreI>(DefaultStore);