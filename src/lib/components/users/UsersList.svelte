<script lang="ts">
  import { liveQuery } from 'dexie';

  import Input from '@shared/Input.svelte';
  import Button from '@shared/Button.svelte';
  import UserItem from './UserItem.svelte';

  import getContextStore from '@utils/storeContext';

  import { db } from '@db';

  const store = getContextStore();

  let participantName = '';

  $: participants = liveQuery(async () => {
    const participants = await db.participants
      .where({ groupId: Number($store.activeGroup) })
      .reverse()
      .sortBy('spins');

    return participants;
  });

  $: participantsLen = $participants ? $participants.length : 0;
  $: disableForm = !$store.activeGroup || participantsLen === 15;

  const saveUser = async () => {
    if (participantName === '' || participantName.length < 3) return;

    try {
      await db.participants.add({
        name: participantName,
        groupId: Number($store.activeGroup),
        spins: 0,
        exclude: false,
      });
      participantName = '';
    } catch (error) {
      console.log('Error al agregar el participante: ', error);
    }
  };

  const clearUserList = async () => {
    if ($store.isSelecting) return;

    const keysToDelete = $participants
      ? $participants.map((participant) => participant.id)
      : [];

    try {
      await db.participants.bulkDelete(keysToDelete);
    } catch (error) {
      console.log('Error borrando lista', error);
    }
  };
</script>

<div>
  <div class="heading-form">
    <h3>
      Participants
      <span>({$participants ? $participants.length : 0})</span>
    </h3>
    <Button color="primary" variant="outline" onClick={clearUserList}>
      Clear List
    </Button>
  </div>
  <form id="addUser" on:submit|preventDefault={saveUser}>
    <Input
      type="text"
      placeholder="Participant name to add"
      width="100%"
      bind:disabled={disableForm}
      bind:value={participantName}
    />
    {#if participantsLen === 15}
      <p>*The maximum number of participants is 15</p>
    {/if}
  </form>

  <div class="users-container">
    {#if $participants}
      {#if $participants.length === 0}
        <div class="no-user-registered">
          <p>There are no registered users</p>
        </div>
      {/if}
      {#each $participants as participant (participant.id)}
        <UserItem
          id={participant.id}
          name={participant.name}
          spins={participant.spins}
          exclude={participant.exclude}
        />
      {/each}
    {/if}
  </div>
</div>

<style>
  .heading-form {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: calc(var(--rounded) * 1.2);
  }

  h3 span {
    color: var(--text-secondary);
  }

  form {
    width: 100%;
    padding: var(--rounded) 0;
    display: flex;
    flex-direction: column;
    margin-bottom: calc(var(--rounded) * 1.2);
    padding-bottom: calc(var(--rounded) * 1.2);
  }

  form p {
    color: var(--text-secondary);
    font-size: 0.7em;
    margin: 0;
    margin-left: 10px;
    margin-top: 5px;
  }

  .users-container {
    max-height: 400px;
    overflow-y: auto;
  }

  .no-user-registered {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--rounded) * 2) 0;
  }

  .no-user-registered p {
    color: var(--text-secondary);
  }
</style>
