<script lang="ts">
  import ResizeSidebar from '@components/ResizeSidebar.svelte';
  import UsersList from '@components/users/UsersList.svelte';
</script>

<div>
  <ResizeSidebar />
  <UsersList />
  <div class="user-data" />
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: var(--rounded) calc(var(--rounded) * 2);
    width: 100%;
  }

  .user-data {
    border: none;
    height: auto;
  }
</style>
