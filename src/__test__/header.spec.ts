import { render } from '@testing-library/svelte';
import Header from '../lib/components/Header.svelte';

it('component render correctly', async () => {

  const { getByText } = render(Header);

  const title = getByText('Roulette');

  expect(title.textContent).toBe('Roulette');

})