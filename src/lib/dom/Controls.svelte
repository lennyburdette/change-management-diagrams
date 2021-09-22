<script lang="ts">
  import type { Step } from '$lib/types';

  // import Pause from '$lib/svg/icons/Pause.svelte';
  // import Play from '$lib/svg/icons/Play.svelte';
  import { fly } from 'svelte/transition';

  export let steps: Step[];
  export let currentStep = 0; // should be bound

  const next = () => {
    if (currentStep + 1 >= steps.length) {
      // pause();
    } else {
      currentStep = currentStep + 1;
    }
  };
  const prev = () => {
    currentStep = currentStep <= 0 ? 0 : currentStep - 1;
  };

  let titleHeight = 0;

  $: nextDisabled = currentStep === steps.length - 1;
  $: prevDisabled = currentStep === 0;

  // let playing: boolean = false;
  // let interval = undefined;
  // const play = () => {
  // 	next();
  // 	playing = true;
  // 	interval = setInterval(() => next(), 5000);
  // };
  // const pause = () => {
  // 	playing = false;
  // 	clearInterval(interval);
  // };
  // const toggle = () => (playing ? pause() : play());

  const onKeyPress = ({ key }) => {
    switch (key) {
      case 'ArrowLeft':
      case 'p':
        prev();
        break;
      case 'ArrowRight':
      case 'n':
      case 'Enter':
        next();
    }
  };
</script>

<svelte:body on:keyup={onKeyPress} />

<div class="flex flex-row space-x-2">
  <div class="relative overflow-hidden flex-grow" style={`height: ${titleHeight}px`}>
    {#each steps as _, index}
      {#if index === currentStep}
        <div
          class="absolute inset-0"
          in:fly|local={{ y: -30, duration: 200 }}
          out:fly|local={{ y: 30, duration: 200 }}
        >
          <!-- <div class="absolute inset-0"> -->
          <div class="p-2 px-3" bind:clientHeight={titleHeight}>
            <div>{index + 1}. {steps[index].title}</div>
            {#if steps[index].description}
              <p class="text-gray-800 text-sm pt-2 max-w-2xl">{steps[index].description}</p>
            {/if}
          </div>
        </div>
      {/if}
    {/each}
  </div>

  <div class="p-2 text-gray-700 flex place-items-start gap-1">
    <button
      on:click={prev}
      disabled={prevDisabled}
      class="rounded hover:bg-brand-light active:bg-brand active:text-white flex pl-1 pr-2"
      class:text-gray-200={prevDisabled}
      class:hover:bg-white={prevDisabled}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M11 17l-5-5m0 0l5-5m-5 5h12"
        />
      </svg>
      Previous
    </button>

    <!-- <button on:click={toggle} class="rounded hover:bg-brand-light">
			{#if playing}
				<Pause />
			{:else}
				<Play />
			{/if}
		</button> -->

    <button
      on:click={next}
      disabled={nextDisabled}
      class="rounded hover:bg-brand-light active:bg-brand active:text-white flex pl-2 pr-1"
      class:text-gray-200={nextDisabled}
    >
      Next
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 7l5 5m0 0l-5 5m5-5H6"
        />
      </svg>
    </button>
  </div>
</div>

<style>
  [disabled] {
    pointer-events: none;
  }
</style>
