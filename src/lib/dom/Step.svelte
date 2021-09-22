<script lang="ts">
  import Complete from '$lib/svg/icons/Complete.svelte';
  import Document from '$lib/svg/icons/Document.svelte';
  import Null from '$lib/svg/icons/Null.svelte';
  import Spinner from '$lib/svg/icons/Spinner.svelte';
  import { scale } from 'svelte/transition';
  import { backOut } from 'svelte/easing';
  import { getState } from './state';
  import { COLORS } from './Server.svelte';

  export let id: string;
  export let label: string;
  export let terminal: boolean = false;
  export let icon: boolean = false;

  const state = getState(id);

  $: complete = $state.type === 'COMPLETE';
  $: active = $state.type === 'ACTIVE';

  $: schemaVersion = 'schema' in $state && $state.schema;
  $: codeVersion = 'code' in $state && $state.code;
</script>

<div
  class="relative p-2 px-3 pr-4 border border-gray-300 rounded grid content-center shadow transition-all"
  class:pr-4={!terminal}
  class:border-brand-dark={active}
  class:bg-brand-light={active}
  class:shadow-lg={active}
  class:-translate-y-1={active}
>
  <div class="flex items-center gap-1 justify-between">
    <div class="flex items-center gap-1" class:mr-5={icon}>
      {#if active && !complete}
        <Spinner />
      {:else if complete}
        <Complete />
      {:else}
        <Null />
      {/if}

      {label}
    </div>

    {#if schemaVersion.length > 0}
      <div in:scale={{ easing: backOut }} out:scale class="absolute right-4">
        <Document version={schemaVersion} />
      </div>
    {:else if codeVersion}
      <div
        in:scale={{ easing: backOut }}
        out:scale
        class={`absolute right-4 w-5 h-5 rounded ${COLORS[codeVersion]}`}
      >
        &nbsp;
      </div>
    {/if}
  </div>

  {#if !terminal}
    <div
      class="absolute top-[50%] right-0 m-[-0.375rem] bg-halfSplit rounded-full w-3 h-3 grid place-content-center transition-all"
      class:active
    >
      <div
        class="absolute top-[1px] left-[1px] right-[1px] bottom-[1px] bg-white rounded-full transition-all"
        class:bg-brand-light={active}
      />
      <div
        class="bg-gray-400 rounded-full w-1 h-1 relative transition-all"
        class:bg-brand-dark={active}
      />
    </div>
  {/if}
</div>

<style>
  .active {
    --color-workflow-card-bg: #ebe6ee;
    --color-border-primary: #391e8a;
  }
</style>
