<script lang="ts">
  import getContextStore from '@utils/storeContext';

  export let id: string;
  export let name: string;

  const store = getContextStore();

  $: activeClass = String($store.activeGroup) === String(id);

  const handleSelectGroup = () => {
    if ($store.isSelecting) return;

    localStorage.setItem('group_id', id);
    store.update((prevStore) => ({ ...prevStore, activeGroup: id }));
  };
</script>

<div
  on:click={handleSelectGroup}
  on:keypress={() => null}
  class={`container ${activeClass && 'selected'}`}
>
  <span class="title">{name}</span>
</div>

<style>
  .container {
    align-items: center;
    border-radius: var(--rounded);
    border: 1px solid transparent;
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 150px;
    min-width: 150px;
    overflow: hidden;
    padding: var(--rounded);
    position: relative;
    transition: all 0.2s ease;
  }

  .container:hover {
    background-color: var(--border-color-lighten);
    color: var(--primary);
  }

  .title {
    flex: 1;
    font-size: 1.3em;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .selected {
    border-color: var(--primary);
    color: var(--primary);
  }
</style>
