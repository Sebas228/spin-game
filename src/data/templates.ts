import GiCartwheel from 'svelte-icons/gi/GiCartwheel.svelte';
import IoMdGrid from 'svelte-icons/io/IoMdGrid.svelte';
import GiCardRandom from 'svelte-icons/gi/GiCardRandom.svelte';

interface TemplateItemI {
  id: number;
  title: string;
  Icon: any;
}

const templates: TemplateItemI[] = [
  { id: 1, title: 'Grid', Icon: IoMdGrid },
  { id: 2, title: 'Spin Wheel', Icon: GiCartwheel },
  { id: 3, title: 'Cards', Icon: GiCardRandom },
];

export default templates;