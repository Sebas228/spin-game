<script lang="ts">
  import IoMdTrash from 'svelte-icons/io/IoMdTrash.svelte';
  import IoMdEye from 'svelte-icons/io/IoMdEye.svelte';
  import IoMdEyeOff from 'svelte-icons/io/IoMdEyeOff.svelte';

  import Button from '@shared/Button.svelte';
  import getContextStore from '@utils/storeContext';

  import { db } from '@db';

  export let id: number;
  export let name: string;
  export let spins: number;
  export let exclude: boolean;

  const store = getContextStore();

  const deleteUser = async () => {
    if ($store.isSelecting) return;

    try {
      await db.participants.delete(id);
    } catch (error) {
      console.log('error', error);
    }
  };

  const excludeUser = async () => {
    if ($store.isSelecting) return;

    try {
      await db.participants.update(id, { exclude: !exclude });
    } catch (error) {
      console.log('error', error);
    }
  };
</script>

<div class={`container ${exclude && 'excluded'}`}>
  <span>{name}</span>
  <div class="actions-container">
    <span>spins: {spins}</span>
    <div class="buttons">
      <Button size="sm" variant="outline" onClick={excludeUser}>
        <span class="icon-delete">
          {#if exclude}
            <IoMdEye />
          {:else}
            <IoMdEyeOff />
          {/if}
        </span>
      </Button>
      <Button size="sm" variant="outline" onClick={deleteUser}>
        <span class="icon-delete">
          <IoMdTrash />
        </span>
      </Button>
    </div>
  </div>
</div>

<style>
  .container {
    align-items: center;
    border-radius: var(--rounded);
    border: 1px solid var(--border-color-lighten);
    display: flex;
    justify-content: space-between;
    margin-bottom: calc(var(--rounded) * 0.7);
    padding: calc(var(--rounded) * 1.2) calc(var(--rounded) * 2);
    transition: box-shadow 0.3s ease;
  }

  .container.excluded {
    background-color: var(--disabled-background);
    color: var(--disabled-color);
    border-color: transparent;
  }

  .container:hover {
    box-shadow: var(--sm-shadow);
  }

  .container > span {
    font-size: 1.1em;
    font-weight: 400;
    color: var(--text-secondary);
  }

  .actions-container {
    display: flex;
    align-items: center;
    gap: 1em;
  }

  .actions-container > span {
    color: var(--text-secondary);
    font-size: 0.8em;
  }

  .buttons {
    display: flex;
    gap: 5px;
  }

  .icon-delete {
    width: 1em;
    height: 1em;
    color: var(--text-secondary);
  }
</style>
