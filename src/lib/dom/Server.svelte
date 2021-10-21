<script context="module">
  export const COLORS = [
    'bg-purple-300',
    'bg-green-300',
    'bg-blue-300',
    'bg-pink-300',
    'bg-red-300'
  ];
</script>

<script lang="ts">
  import Document from '$lib/svg/icons/Document.svelte';
  import { backOut } from 'svelte/easing';
  import { fly, scale } from 'svelte/transition';

  export let code: number;
  export let schema: string;
  export let absolute = false;
  export let visible = true;

  $: position = absolute ? 'absolute w-full h-full top-0 left-0' : 'relative';
</script>

<div class={`${position} grid grid-flow-col place-content-center`}>
  {#if visible}
    <div
      in:scale={{ easing: backOut, duration: 500 }}
      out:fly
      class={`rounded p-[1px] ${COLORS[code]}`}
    >
      <Document version={schema} />
    </div>
  {/if}
</div>
