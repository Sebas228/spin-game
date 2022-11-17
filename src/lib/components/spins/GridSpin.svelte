<script lang="ts">
  import { liveQuery } from 'dexie';

  import { DialogTitle } from '@rgossiaux/svelte-headlessui';

  import SpinButton from './SpinButton.svelte';
  import Pyro from '@components/Pyro.svelte';
  import Modal from '@lib/shared/Modal.svelte';
  import Button from '@lib/shared/Button.svelte';
  import getContextStore from '@utils/storeContext';

  import { db } from '@db';

  import {
    sleep,
    colors,
    randomIndexColor,
    suffleParticipants,
    getRandomInIntervalSuffles,
  } from '@utils/participants';

  interface ParticipantSelected {
    id: string;
    name: string;
    index: number;
  }

  interface WinnerModalConfig {
    isOpen: boolean;
    name: string;
    id: string;
    indexSelected: number;
  }

  const store = getContextStore();

  let winnerModalConfig: WinnerModalConfig = {
    isOpen: false,
    id: '',
    name: '',
    indexSelected: 0,
  };

  $: participants = liveQuery(async () => {
    const participants = await db.participants
      .filter(
        (participant) =>
          participant.groupId === Number($store.activeGroup) &&
          !participant.exclude
      )
      .toArray();

    return participants;
  });

  $: suffledParticipants = $participants ? $participants : [];

  $: participantsIds = suffledParticipants.map(
    (participant: any) => participant.id
  );

  const resetStyle = () => {
    for (const id of participantsIds) {
      const participantId = `participant-cell-${id}`;
      const participantCell = document.getElementById(participantId);

      participantCell.style.backgroundColor = 'transparent';
      participantCell.style.borderColor = `var(--border-color)`;
      participantCell.style.color = `var(--text-primary)`;
    }
  };

  const updateStoreIsSelecting = (isSelecting: boolean) => {
    store.update((prevStore) => ({ ...prevStore, isSelecting }));
  };

  const spinForParticipant = async (): Promise<ParticipantSelected> => {
    let participantSelected: ParticipantSelected = {} as any;

    resetStyle();
    suffledParticipants = suffleParticipants($participants);

    const participantslen = participantsIds.length;
    const suffles = getRandomInIntervalSuffles(participantslen, 3, 4);

    for (let i = 0; i <= suffles; i++) {
      const selectedIndex = Math.floor(Math.random() * participantslen);
      const randomColorIndex = randomIndexColor();

      const selectedId = participantsIds[selectedIndex];
      const colorSelected = colors[randomColorIndex];

      const participantId = `participant-cell-${selectedId}`;
      const participantCell = document.getElementById(participantId);

      participantCell.style.backgroundColor = `var(--${colorSelected})`;
      participantCell.style.borderColor = `var(--${colorSelected})`;
      participantCell.style.color = `var(--white)`;

      await sleep(70 + i * 1.5);

      if (i !== suffles) {
        participantCell.style.backgroundColor = 'transparent';
        participantCell.style.borderColor = `var(--border-color)`;
        participantCell.style.color = `var(--text-primary)`;
      } else {
        const participantName = participantCell.dataset.username;
        participantSelected = {
          id: selectedId,
          name: participantName,
          index: selectedIndex,
        };
      }
    }

    return participantSelected;
  };

  const handleSelectParticipant = async () => {
    updateStoreIsSelecting(true);

    const { id, name, index } = await spinForParticipant();

    winnerModalConfig = {
      ...winnerModalConfig,
      isOpen: true,
      name,
      id,
      indexSelected: index,
    };
  };

  const handleCloseAndUpdateDb = async () => {
    const { id, indexSelected } = winnerModalConfig;
    const participantSpins = suffledParticipants[indexSelected]?.spins ?? 0;

    try {
      await db.participants.update(id, {
        spins: participantSpins + 1,
      });

      resetStyle();
      updateStoreIsSelecting(false);

      winnerModalConfig = {
        id: '',
        indexSelected: 0,
        isOpen: false,
        name: '',
      };
    } catch (error) {
      console.log('error', error);
    }
  };
</script>

<div class="container-grid">
  <SpinButton title="Select Participant" onClick={handleSelectParticipant} />
  <div class="grid">
    {#each suffledParticipants as participant (participant.id)}
      <div
        data-username={participant.name}
        class="participant-cell"
        id={`participant-cell-${participant.id}`}
      >
        {participant.name}
      </div>
    {/each}
  </div>
  <Modal
    size="sm"
    onClose={handleCloseAndUpdateDb}
    bind:isOpen={winnerModalConfig.isOpen}
  >
    <Pyro />
    <DialogTitle>Winner</DialogTitle>
    <p class="text-selected">
      The selected participant is: <span>{winnerModalConfig.name}</span>
    </p>
    <div class="button-accept-container">
      <Button color="primary" size="sm" onClick={handleCloseAndUpdateDb}>
        Continue
      </Button>
    </div>
  </Modal>
</div>

<style>
  .container-grid {
    min-height: 500px;
    border: 1px solid transparent;
    position: relative;
  }

  .grid {
    display: grid;
    gap: 0.5em;
    grid-template-columns: repeat(3, 1fr);
    width: 100%;
  }

  .participant-cell {
    align-items: center;
    border-radius: var(--rounded);
    border: 1px solid var(--border-color);
    display: flex;
    font-size: 1.2em;
    font-weight: 500;
    justify-content: center;
    padding: calc(var(--rounded) * 3);
    text-align: center;
    transition: background-color 0.1s ease;
  }

  .text-selected {
    margin-bottom: calc(var(--rounded) * 3);
    margin-top: calc(var(--rounded) * 2);
  }

  .text-selected span {
    font-weight: 600;
  }

  .button-accept-container {
    align-items: center;
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
</style>
