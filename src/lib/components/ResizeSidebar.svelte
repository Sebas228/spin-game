<script lang="ts">
  import { onMount } from 'svelte';

  let sidebarEl: HTMLElement;
  let resizerEl: HTMLElement;

  let startX: number;
  let startWidth: number;

  const minWidth: number = 300;
  const maxWidth: number = 500;

  function initResize(this: HTMLElement, ev: MouseEvent) {
    startX = ev.clientX;
    startWidth = parseInt(
      document.defaultView.getComputedStyle(sidebarEl).width,
      10
    );

    window.addEventListener('mousemove', resize, false);
    window.addEventListener('mouseup', stopResize, false);
  }

  function stopResize() {
    window.removeEventListener('mousemove', resize, false);
    window.removeEventListener('mouseup', stopResize, false);
  }

  function resize(this: HTMLElement, ev: MouseEvent) {
    const clientX = ev.clientX;
    const newPixelsEle = startWidth + startX - clientX;

    if (newPixelsEle <= minWidth || newPixelsEle >= maxWidth) return;

    resizerEl.style.backgroundColor = '--var(--border-color-lighten)';
    sidebarEl.style.width = `${newPixelsEle}px`;
  }

  onMount(() => {
    sidebarEl = document.getElementById('sidebar');

    resizerEl = document.getElementById('resize-bar');
    resizerEl.addEventListener('mousedown', initResize, false);

    return () => {
      resizerEl.removeEventListener('mousedown', initResize, false);
    };
  });
</script>

<div class="resize-bar" id="resize-bar" />

<style>
  .resize-bar {
    background-color: var(--border-color-lighten);
    border-radius: var(--rounded);
    cursor: ew-resize;
    height: calc(100% - var(--rounded) * 2);
    left: 0;
    margin-top: var(--rounded);
    padding: 0;
    position: absolute;
    top: 0;
    transition: all 0.2s ease;
    user-select: none;
    width: 3px;
  }

  .resize-bar:hover {
    background-color: var(--border-color);
  }
</style>
