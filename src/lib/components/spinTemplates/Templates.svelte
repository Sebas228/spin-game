<script lang="ts">
  import TemplateItem from '@components/spinTemplates/TemplateItem.svelte';
  import templates from '@data/templates';

  import getContextStore from '@utils/storeContext';

  export let activeTemplate: number;

  const store = getContextStore();

  const handleActiveTemplate = (id: number) => {
    if ($store.isSelecting) return;
    activeTemplate = id;
  };
</script>

<div class="container">
  {#each templates as template (template.id)}
    <TemplateItem
      title={template.title}
      Icon={template.Icon}
      active={activeTemplate === template.id}
      onClick={() => handleActiveTemplate(template.id)}
    />
  {/each}
</div>

<style>
  .container {
    border-radius: var(--rounded);
    border: 1px solid var(--border-color);
    display: flex;
    flex-direction: column;
    left: calc(var(--rounded) * 4);
    overflow: hidden;
    position: fixed;
    top: 50%;
    transform: translateY(-35%);
    width: 100px;
  }
</style>
