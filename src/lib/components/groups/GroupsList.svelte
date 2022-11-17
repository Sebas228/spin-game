<script lang="ts">
  import { liveQuery } from 'dexie';

  import ButtonAddGroup from './ButtonAddGroup.svelte';
  import GroupItem from './GroupItem.svelte';

  import { db } from '@db';

  const MAX_GROUPS = 3;
  const groups = liveQuery(() => db.groups.toArray());

  $: buttonDisabled = $groups && $groups.length === MAX_GROUPS;
</script>

<div class="container">
  <div class="actions">
    {#if $groups}
      {#if $groups.length === 0}
        <div class="no-groups">
          <p>No groups created</p>
        </div>
      {/if}
      {#each $groups as group (group.id)}
        <GroupItem id={group.id} name={group.name} />
      {/each}
    {/if}
    <ButtonAddGroup bind:disabled={buttonDisabled} />
  </div>
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    padding: var(--rounded) calc(var(--rounded) * 2);
    width: 100%;
  }

  .actions {
    align-items: center;
    display: flex;
    gap: 5px;
    overflow-x: auto;
    width: 100%;
  }

  .no-groups p {
    color: var(--text-secondary);
  }
</style>
