<script lang="ts">
  import { fly } from 'svelte/transition';

  import { getState } from './state';

  export let id: string;

  const state = getState(id);
  $: visible = $state.type !== 'HIDE';
</script>

{#if visible}
  <div in:fly={{ y: 100 }} out:fly={{ y: 100 }} class="fixed bottom-0 right-0">
    <div class="m-10 bg-white border rounded p-4 shadow-lg flex space-x-2">
      <div class="rounded overflow-hidden bg-purple-500 w-9 h-9 translate-y-1">
        <img src="/apollo.jpeg" alt="Apollo" />
      </div>
      <div>
        <div class="space-x-1">
          <span class="font-bold text-gray-800">Apollo</span>
          <span
            class="text-xs inline-block bg-gray-300 text-gray-600  rounded-sm translate-y-[-2px] px-[2px]"
            >APP</span
          >
          <span class="text-sm text-gray-500">4:10 PM</span>
        </div>

        <div class="font-bold">
          <span class="text-lg">🚀</span> Schema changes to
          <span class="text-blue-500">mygraph@prod</span> just landed!
        </div>

        <div class="x pl-3">
          Type
          <span
            class="font-mono inline-block px-1 bg-gray-100 border rounded-sm text-red-400 text-sm"
          >
            Product
          </span>: field
          <span
            class="font-mono inline-block px-1 bg-gray-100 border rounded-sm text-red-400 text-sm"
          >
            variation
          </span>
          added
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .x {
    position: relative;
  }
  .x:before {
    position: absolute;
    content: '';
    display: block;
    width: 4px;
    height: 100%;
    left: 0;
    background: rgba(16, 185, 129);
    border-radius: 2px;
  }
</style>
