<script lang="ts">
  import { derived, writable } from 'svelte/store';
  import Connector from '$lib/svg/Connector.svelte';
  import {
    createConnectors,
    createWrappers,
    getBoxes,
    registerBox,
    relativeBoxBounds
  } from './boxContext';

  import type { ConnectorConfig, WrapperConfig } from '$lib/types';

  export let lineConfigs: ConnectorConfig[];
  export let boxConfigs: WrapperConfig[];

  const boxes = getBoxes();
  const resize = writable([]);
  let w = 0;
  let h = 0;
  $: resize.set([w, h]);

  const relativeBoxes = derived([boxes, resize], ([$boxes]) => relativeBoxBounds($boxes));

  const lines = derived(relativeBoxes, ($boxes) => createConnectors(lineConfigs, $boxes));
  const wrappers = derived(relativeBoxes, ($boxes) => createWrappers(boxConfigs, $boxes));
</script>

<div
  class="relative flex-grow grid place-content-center"
  bind:clientWidth={w}
  bind:clientHeight={h}
  use:registerBox={{ id: 'parent', boxes }}
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="absolute inset-0 text-gray-400"
    viewBox="0 0 {w} {h}"
    width={w}
    height={h}
  >
    {#each $lines as line}
      {#if line.to && line.from}
        <Connector {...line} />
      {/if}
    {/each}
  </svg>

  {#each $wrappers as wrapper}
    <div
      class="absolute border rounded-lg"
      style={`top: ${wrapper.y}px; left: ${wrapper.x}px; width: ${wrapper.width}px; height: ${wrapper.height}px`}
    />
  {/each}

  <slot />
</div>
