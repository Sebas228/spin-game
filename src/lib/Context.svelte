<script lang="ts">
  import { setContext, onMount } from 'svelte';
  import { globalStore } from '@store';

  setContext('store', globalStore);

  onMount(() => {
    const existsInLocalStorageGroup = localStorage.getItem('group_id');
    globalStore.update((prevStore) => ({
      ...prevStore,
      activeGroup: existsInLocalStorageGroup,
    }));
  });
</script>

<slot />
