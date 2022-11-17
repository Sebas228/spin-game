<script lang="ts">
  export let title: string;
  export let Icon: any;
  export let active: boolean = false;
  export let onClick: () => void;
</script>

<div
  class={`template-item ${active && 'active'}`}
  on:click={onClick}
  on:keypress={null}
>
  <div class="icon"><Icon /></div>
  <span>{title}</span>
</div>

<style>
  .template-item {
    align-items: center;
    color: var(--text-secondary);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 10px;
    justify-content: center;
    padding: calc(var(--rounded) * 2) 0;
    transition: all 0.2s ease;
  }

  .template-item:hover {
    background-color: var(--border-color);
  }

  .template-item.active {
    color: var(--primary);
  }

  .icon {
    width: 100%;
    height: 50px;
  }
</style>
