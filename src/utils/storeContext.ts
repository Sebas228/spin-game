import { getContext } from 'svelte';
import type { Writable } from 'svelte/store';

import type { GlobalStoreI } from '@store';

const getContextStore = () => {
  return getContext<Writable<GlobalStoreI>>('store');
};

export default getContextStore;