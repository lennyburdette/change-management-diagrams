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
  const _skipState = getState('checks-bypass');

  $: complete = $state.type === 'COMPLETE';
  $: active = $state.type === 'ACTIVE';
  $: errored = $state.type === 'BROKEN';

  $: schemaVersion = 'schema' in $state && $state.schema;
  $: codeVersion = 'code' in $state && $state.code;
  $: highlight = ($state.type === 'COMPLETE' && $state.highlight) || active;

  export let hasSkip = false;
  $: showSkip = hasSkip && $_skipState.type !== 'HIDE';
</script>

<div
  class="relative p-2 px-3 pr-9 border-2 border-gray-300 rounded grid content-center shadow transition-all"
  class:pr-4={!terminal}
  class:border-purple-800={highlight}
  class:shadow-lg={highlight}
  class:-translate-y-1={highlight}
>
  <div class="flex items-center gap-1 justify-between">
    <div class="flex items-center gap-1" class:mr-5={icon}>
      <div class="flex-shrink-0">
        {#if active && !complete}
          <Spinner />
        {:else if complete}
          <Complete />
        {:else if errored}
          ❌
        {:else}
          <Null />
        {/if}
      </div>

      {label}
    </div>

    {#if schemaVersion.length > 0}
      <div in:scale={{ easing: backOut }} out:scale class="absolute right-2 text-base">
        <div class="relative scale-75"><Document version={schemaVersion} /></div>
      </div>
    {:else if codeVersion > -1}
      <div
        in:scale={{ easing: backOut }}
        out:scale
        class={`absolute right-4 w-5 h-5 rounded ${COLORS[codeVersion]}`}
      >
        &nbsp;
      </div>
    {/if}

    {#if showSkip}
      <button
        in:scale={{ easing: backOut }}
        out:scale
        class="absolute right-2 top-2 bg-green-600 text-white px-2 rounded uppercase shadow hover:bg-green-500 hover:translate-y-[-1px] active:bg-green-800 active:translate-y-0"
      >
        Skip
      </button>
    {/if}
  </div>

  <!-- {#if !terminal}
    <div
      class="absolute top-[50%] right-0 m-[-0.375rem] bg-halfSplit rounded-full w-3 h-3 grid place-content-center transition-all"
      class:highlight
    >
      <div
        class="absolute top-[2px] left-[2px] right-[2px] bottom-[2px] bg-white rounded-full transition-all"
      />
      <div
        class="bg-gray-400 rounded-full w-1 h-1 relative transition-all"
        class:border-purple-800={highlight}
      />
    </div>
  {/if} -->
</div>

<style>
  .highlight {
    --color-workflow-card-bg: #ebe6ee;
    --color-border-primary: #391e8a;
  }
</style>
