<script lang="ts">
  import { fade, scale } from 'svelte/transition';
  import { liveQuery } from 'dexie';

  import GridSpin from '@components/spins/GridSpin.svelte';
  import Templates from '@lib/components/spinTemplates/Templates.svelte';

  import { db } from '@db';

  let activeTemplate: number = 1;

  $: groups = liveQuery(() => db.groups.toArray());
</script>

<div class="container">
  {#if $groups && $groups.length > 0}
    <div transition:fade>
      <Templates bind:activeTemplate />
    </div>
  {/if}
  <div class="spin-container">
    {#if activeTemplate === 1}
      <div transition:scale={{ delay: 100 }}>
        <GridSpin />
      </div>
    {/if}
  </div>
</div>

<style>
  .container {
    position: relative;
    width: 100%;
    height: 100%;
    padding: 0 calc(var(--rounded) * 2);
  }

  .spin-container {
    margin-left: calc(100px + calc(var(--rounded) * 2));
    padding: calc(var(--rounded) * 2) calc(var(--rounded) * 4);
  }
</style>
