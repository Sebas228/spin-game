<script lang="ts">
  import { DialogTitle } from '@rgossiaux/svelte-headlessui';

  import IoIosAdd from 'svelte-icons/io/IoIosAdd.svelte';

  import Button from '@shared/Button.svelte';
  import Input from '@shared/Input.svelte';
  import Modal from '@shared/Modal.svelte';

  import templates from '@data/templates';
  import getContextStore from '@utils/storeContext';

  import { db } from '@db';
  import { formatDate } from '@utils/dates';

  const store = getContextStore();

  export let disabled: boolean = false;

  let isOpen: boolean = false;
  let groupName: string = '';

  $: disabledButtonSave = groupName === '' || groupName.length < 3;

  const handleOpenModal = () => {
    if ($store.isSelecting) return;
    isOpen = true;
  };

  const handleAddGroup = async () => {
    if (disabledButtonSave) return;

    const now = new Date();
    const createdAt = formatDate(now);
    const { Icon, ...template } = templates[0];

    try {
      const idGroup = await db.groups.add({
        name: groupName,
        createdAt,
        template,
      });

      groupName = '';
      isOpen = false;

      store.update((prevStore) => ({
        ...prevStore,
        activeGroup: String(idGroup),
      }));
    } catch (error) {
      console.log('Error', error);
    }
  };
</script>

<div class="button-container">
  <Button {disabled} variant="filled" color="primary" onClick={handleOpenModal}>
    <span class="icon-add"><IoIosAdd /></span>
    Add Group
  </Button>
  <Modal size="sm" bind:isOpen>
    <DialogTitle class="title">Add New Group</DialogTitle>

    <form on:submit|preventDefault={handleAddGroup}>
      <div class="input-container">
        <Input
          width="100%"
          type="text"
          placeholder="Group name"
          bind:value={groupName}
        />
      </div>

      <div class="modal-actions-container">
        <Button
          width="70px"
          onClick={() => (isOpen = false)}
          size="md"
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          size="md"
          variant="filled"
          color="primary"
          width="70px"
          disabled={disabledButtonSave}
          type="submit"
        >
          Save
        </Button>
      </div>
    </form>
  </Modal>
</div>

<style>
  .button-container {
    margin-left: auto;
  }

  .icon-add {
    width: 1.5em;
    height: 1.5em;
  }

  .input-container {
    min-width: 0;
    max-width: 100%;
    margin-bottom: calc(var(--rounded) * 2);
  }

  .modal-actions-container {
    align-items: center;
    display: flex;
    gap: var(--rounded);
    justify-content: flex-end;
    margin: var(--rounded) 0;
  }
</style>
