<script lang="ts">
  import { onMount } from 'svelte';

  onMount(() => {
    const themeSaved = localStorage.getItem('theme');
    document.body.dataset.theme = themeSaved ?? 'light';
  });
</script>

<main>
  <header>
    <slot name="header" />
  </header>

  <div class="content">
    <section>
      <slot name="content" />
    </section>
    <aside id="sidebar">
      <slot name="sidebar" />
    </aside>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100%;
  }

  header {
    height: 100px;
    width: 100%;
    padding: 0 calc(var(--rounded) * 4);
  }

  .content {
    display: flex;
    flex-direction: row;
    height: 100%;
    width: 100%;
  }

  .content section {
    flex: 1;
  }

  .content aside {
    width: 410px;
    min-width: 300px;
    padding: var(--rounded);
    position: relative;
  }

  @media (max-width: 480px) {
    .content {
      flex-direction: column;
    }

    .content section,
    .content aside {
      width: 100%;
    }
  }
</style>
