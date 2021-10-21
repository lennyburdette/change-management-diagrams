<script lang="ts">
  import { fly } from 'svelte/transition';
  import { getBoxes, registerBox } from './boxContext';
  import { getState } from './state';
  import Complete from '$lib/svg/icons/Complete.svelte';
  import WorkLine from './WorkLine.svelte';

  const boxes = getBoxes();

  let id: string = 'studio';
  export let classes: string | undefined = undefined;

  const state = getState(id);

  $: visible = $state.type !== 'HIDE';
  $: active = $state.type === 'ACTIVE';
  $: work =
    $state.type === 'ACTIVE' ? $state.work : $state.type === 'DEFAULT' ? $state.work : undefined;
</script>

{#if visible}
  <div in:fly out:fly class="relative grid justify-center {classes}">
    <div
      class="relative p-4 px-5 border-2 border-gray-300 bg-white rounded-xl shadow text-center grid grid-flow-col gap-1 justify-center items-center transition-all"
      class:border-purple-800={active}
      class:shadow-lg={active}
      class:-translate-y-1={active}
      use:registerBox={{ boxes, id }}
    >
      <span class="text-3xl transition" class:opacity-0={!!work}>Apollo Studio</span>

      {#if work === 'check-composition'}
        <WorkLine>Checking composition…</WorkLine>
      {:else if work === 'check-operations'}
        <WorkLine>Checking operations…</WorkLine>
      {:else if work === 'compose'}
        <WorkLine>Composing subgraphs…</WorkLine>
      {:else if work === 'complete'}
        <WorkLine big>✅</WorkLine>
      {:else if work === 'error'}
        <WorkLine big>❌</WorkLine>
      {/if}
    </div>
  </div>
{/if}
