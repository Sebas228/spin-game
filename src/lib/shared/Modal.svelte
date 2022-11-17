<script lang="ts">
  import {
    Dialog,
    DialogOverlay,
    Transition,
    TransitionChild,
  } from '@rgossiaux/svelte-headlessui';

  type Size = 'sm' | 'md';

  export let size: Size = 'md';
  export let isOpen: boolean = false;
  export let onClose: () => void | undefined = undefined;

  const handleClose = () => {
    if (onClose) onClose();
    isOpen = false;
  };
</script>

<Transition show={isOpen}>
  <Dialog class="dialog" on:close={handleClose}>
    <DialogOverlay class="overlay">
      <TransitionChild
        class="body-wrapper"
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <div class={`body ${size}`}>
          <slot />
        </div>
      </TransitionChild>
    </DialogOverlay>
  </Dialog>
</Transition>
