<script lang="ts">
  import Button from '@lib/shared/Button.svelte';
  import getContextStore from '@utils/storeContext';

  export let title: string;
  export let onClick: () => void;

  const store = getContextStore();
  $: disabled = $store.isSelecting;
</script>

<div class="spin-button-container">
  <Button bind:disabled radius="100px" color="secondary" {onClick}>
    <div class="button-title">
      {title}
    </div>
  </Button>
</div>

<style>
  .spin-button-container {
    align-items: center;
    display: flex;
    justify-content: center;
    padding-bottom: calc(var(--rounded) * 4);
    width: 100%;
  }

  .button-title {
    font-size: 1.3em;
    padding: 10px;
  }
</style>
