<script lang="ts">
  import { getState } from '$lib/dom/state';
  import { fly } from 'svelte/transition';
  import Intro from './Intro.svelte';
  import Todo from './Todo.svelte';

  const state = getState('slide');
  $: visible = $state.type === 'ACTIVE';

  $: id = $state.type === 'ACTIVE' ? $state.id : null;
  $: component = (() => {
    switch (id) {
      case 'INTRO':
        return Intro;
      default:
        return Todo;
    }
  })();
</script>

{#if visible}
  <div in:fly class="fixed inset-0 bg-white grid place-content-center z-40">
    <svelte:component this={component} {id} />
  </div>
{/if}
