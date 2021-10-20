<script lang="ts">
  import { getBoxes, registerBox } from './boxContext';
  import { getState } from './state';
  import Server from './Server.svelte';
  import { fly } from 'svelte/transition';

  const boxes = getBoxes();

  export let id: string;
  export let name: string;
  export let code: number;
  export let schema: string;

  const state = getState(id);

  function makeServers(newServers: { code: number; schema: string }[]) {
    const out = [];
    for (let i = 0; i < 3; i++) {
      if (i >= newServers.length) {
        out.push({ code: code, schema: schema });
      } else {
        out.push({ code: newServers[i].code, schema: newServers[i].schema });
      }
    }
    return out;
  }

  $: visible = $state.type !== 'HIDE';
  $: active = $state.type === 'ACTIVE' || $state.type === 'ROLLING_DEPLOY';
  $: newServers =
    $state.type === 'ROLLING_DEPLOY'
      ? $state.servers
      : $state.type === 'DEPLOY'
      ? new Array(3).fill({ code: $state.code, schema: $state.schema })
      : [];

  $: servers = makeServers(newServers);
</script>

{#if visible}
  <div in:fly out:fly class="grid justify-center">
    <div class="text-center text-xl">
      {name}
    </div>
    <div
      class="border-2 border-gray-300 bg-white rounded-lg shadow overflow-hidden transition-all"
      use:registerBox={{ id, boxes }}
      class:border-purple-800={active}
      class:shadow-lg={active}
      class:-translate-y-1={active}
    >
      <div class="relative p-4 grid grid-flow-col items-stretch gap-1">
        {#each servers as server}
          <Server {...server} />
        {/each}
      </div>
    </div>
  </div>
{/if}
