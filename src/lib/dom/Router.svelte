<script lang="ts">
  import { getBoxes, registerBox } from './boxContext';
  import { getState } from './state';
  import Server from './Server.svelte';
  import { fly } from 'svelte/transition';

  const boxes = getBoxes();

  export let id: string;
  export let name: string;
  export let variant: string | undefined = undefined;
  export let code: number;
  export let schema: string;

  const state = getState(id);

  $: visible = $state.type !== 'HIDE';
  $: active = $state.type === 'ACTIVE' || $state.type === 'DEPLOY';
  $: servers =
    $state.type === 'DEPLOY'
      ? new Array(3).fill({ code: $state.code, schema: $state.schema })
      : new Array(3).fill({ code, schema });
</script>

{#if visible}
  <div in:fly out:fly class="grid justify-center">
    <div
      class="border-2 border-gray-300 bg-white rounded-lg shadow overflow-hidden transition-all"
      use:registerBox={{ id, boxes }}
      class:border-purple-800={active}
      class:shadow-lg={active}
      class:-translate-y-1={active}
    >
      {#if variant}
        <div class="px-4 text border-b bg-gray-300 text-gray-800 text-center">
          my-graph@{variant}
        </div>
      {/if}
      <div class="relative p-4 grid grid-flow-col items-stretch gap-1">
        {#each servers as server}
          <Server {...server} />
        {/each}
      </div>
    </div>
    <div class="text-center text-xl">
      {name}
    </div>
  </div>
{/if}
