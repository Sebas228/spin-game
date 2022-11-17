<script lang="ts">
  type Colors = 'base' | 'primary' | 'secondary' | 'accent' | 'danger';
  type Size = 'sm' | 'md';
  type Variants = 'outline' | 'filled';

  const colorClass = {
    base: '',
    primary: 'primary',
    secondary: 'secondary',
    accent: 'accent',
    danger: 'danger',
  };

  const sizeClass = {
    sm: 'sm',
    md: '',
  };

  export let color: Colors = 'base';
  export let variant: Variants = 'filled';
  export let type: string | undefined = 'button';
  export let size: Size = 'md';

  export let id: string | undefined = undefined;
  export let name: string | undefined = undefined;
  export let disabled: boolean = false;
  export let width: string | undefined = 'auto';
  export let radius: string | undefined = undefined;

  export let onClick: () => void | undefined = undefined;
</script>

<button
  {id}
  {type}
  {name}
  {disabled}
  style:width
  style={`${radius && `border-radius: ${radius}`}`}
  class={`${variant} ${colorClass[color]} ${sizeClass[size]}`}
  on:click={disabled ? null : onClick}
>
  <slot />
</button>

<style>
  button {
    align-items: center;
    justify-content: center;
    background-color: transparent;
    border-radius: var(--rounded);
    border: none;
    cursor: pointer;
    display: flex;
    font-size: 0.9em;
    font-weight: 600;
    gap: var(--rounded);
    padding: var(--rounded) calc(var(--rounded) * 1.5);
    transition: background-color 0.2s ease;
  }

  button:hover {
    background-color: var(--border-color);
  }

  .filled {
    color: var(--white);
  }

  .outline {
    border: 1px solid var(--border-color);
    color: 1px solid var(--border-color);
  }

  .filled.primary {
    background-color: var(--primary);
  }

  .outline.primary {
    border-color: var(--primary-hover-outline);
    color: var(--primary);
  }

  .filled.primary:hover {
    background-color: var(--primary-hover);
  }

  .outline.primary:hover {
    background-color: var(--primary-hover-outline);
  }

  .filled.secondary {
    background-color: var(--secondary);
  }

  .outline.secondary {
    border-color: var(--secondary-hover-outline);
    color: var(--secondary);
  }

  .filled.secondary:hover {
    background-color: var(--secondary-hover);
  }

  .outline.secondary:hover {
    background-color: var(--secondary-hover-outline);
  }

  .filled.accent {
    background-color: var(--accent);
  }

  .outline.accent {
    border-color: var(--accent-hover-outline);
    color: var(--accent);
  }

  .filled.accent:hover {
    background-color: var(--accent-hover);
  }

  .outline.accent:hover {
    background-color: var(--accent-hover-outline);
  }

  .filled.danger {
    background-color: var(--danger);
  }

  .outline.danger {
    border-color: var(--danger-hover-outline);
    color: var(--danger);
  }

  .filled.danger:hover {
    background-color: var(--danger-hover);
  }

  .outline.danger:hover {
    background-color: var(--danger-hover-outline);
  }

  .sm {
    padding: calc(var(--rounded) * 0.7) calc(var(--rounded) * 0.9);
  }

  button:disabled,
  button[disabled] {
    background-color: var(--disabled-background) !important;
    color: var(--disabled-color) !important;
    user-select: none;
    margin: none;
  }

  button:disabled:hover,
  button[disabled]:hover {
    cursor: default;
  }
</style>
