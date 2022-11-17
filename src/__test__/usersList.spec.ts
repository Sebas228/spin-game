import { render, screen } from "@testing-library/svelte";
import UsersList from "../lib/components/users/UsersList.svelte";

beforeAll(() => {
  render(UsersList);
});

it('must be exists title Participants', () => {

  const { getByText } = screen;

  const heading = getByText(/Participants/g);

  expect(heading).toBeDefined();

});

it('must be exists an input field', () => { });