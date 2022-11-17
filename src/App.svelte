<script lang="ts">
  import Layout from '@lib/Layout.svelte';
  import Context from '@lib/Context.svelte';

  import Header from '@components/Header.svelte';
  import Content from '@components/Content.svelte';
  import Sidebar from '@components/Sidebar.svelte';
</script>

<Context>
  <Layout>
    <Header slot="header" />
    <Sidebar slot="sidebar" />
    <Content slot="content" />
  </Layout>
</Context>
