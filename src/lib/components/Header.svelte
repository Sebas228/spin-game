<script lang="ts">
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import BiSun from 'svelte-icons-pack/bi/BiSun';
  import BiMoon from 'svelte-icons-pack/bi/BiMoon';
  import AiFillGithub from 'svelte-icons-pack/ai/AiFillGithub';

  import Button from '@shared/Button.svelte';

  const themeInStorage = localStorage.getItem('theme');
  const defaultTheme = themeInStorage ?? 'light';

  let theme = defaultTheme;

  $: buttonIconSrc = theme === 'dark' ? BiSun : BiMoon;

  const changeTheme = () => {
    if (theme === 'dark') theme = 'light';
    else theme = 'dark';

    document.body.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  };
</script>

<div>
  <h1>Roulette</h1>
  <div class="switch-theme-container">
    <Button name="github button" variant="outline">
      <Icon src={AiFillGithub} size="23" color="var(--text-secondary)" />
    </Button>
    <Button name="theme button" variant="outline" onClick={changeTheme}>
      <Icon src={buttonIconSrc} size="23" color="var(--text-secondary)" />
    </Button>
  </div>
</div>

<style>
  div {
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: space-between;
    width: 100%;
    border-bottom: 1px solid var(--border-color);
  }

  .switch-theme-container {
    align-items: center;
    display: flex;
    width: max-content;
    border: none;
    gap: var(--rounded);
  }
</style>
