<script lang="ts">
  import GroupsList from '@components/groups/GroupsList.svelte';
  import SpinTemplates from './SpinTemplates.svelte';
</script>

<div class="container">
  <GroupsList />
  <SpinTemplates />
</div>

<style>
  .container {
    padding: calc(var(--rounded) * 2);
  }
</style>
