<script lang="ts">
  type Colors = 'base' | 'primary' | 'secondary' | 'accent';

  const colorClass = {
    base: '',
    primary: 'primary',
    secondary: 'secondary',
    accent: 'accent',
  };

  export let type: string = 'text';
  export let color: Colors = 'base';
  export let id: string | undefined = undefined;
  export let customClass: string | undefined = undefined;
  export let placeholder: string | undefined = undefined;
  export let width: string | undefined = 'auto';
  export let value: string;
  export let disabled: boolean = false;

  const onInput = (e: any) => (value = e.target.value);
</script>

<input
  {type}
  {id}
  {placeholder}
  {value}
  {disabled}
  style:width
  class={`${colorClass[color]} ${customClass}`}
  on:input={onInput}
/>

<style>
  input {
    background-color: transparent;
    border-radius: var(--rounded);
    border: 1px solid var(--border-color);
    color: var(--text-primary);
    font-size: 0.9em;
    padding: calc(var(--rounded) * 1.5) calc(var(--rounded) * 1.8);
    min-width: auto;
  }

  input:focus {
    box-shadow: var(--focus-shadow);
    outline: none;
    padding: calc(var(--rounded) * 1.5) calc(var(--rounded) * 1.8);
  }

  .primary {
    border-color: var(--primary);
  }

  .secondary {
    border-color: var(--secondary);
  }

  .accent {
    border-color: var(--accent);
  }
</style>
